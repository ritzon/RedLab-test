import React, {Component} from 'react';
import {Grid, ExpansionPanelDetails, MenuItem, ExpansionPanelSummary, Tooltip, ExpansionPanel, Button, TextField, Icon, Typography } from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../appointments/store/actions';
import _ from '@lodash';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import { getAppointmentsResultsApi, getEmployeesAllApi, getSpecialitiesApi } from '../../../api';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataTables from 'material-ui-datatables'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hasArrayEmptyField, hasEmptyField, mergeExaminations } from 'Utils';




class AttendAppointment extends Component {
    state = {
        examinations: [],
        specialities: [],
        employees: [],
        expanded: null,
        form: {
            result: '',
            SpecialityId: '',
            ResponsibleId: ''
        }
    };

    componentDidMount() {
        const params = this.props.match.params;
        const {appointmentId} = params;
        this.fetchExaminations(appointmentId)
        this.fetchSpecialities()
    }
    
    fetchExaminations = (appointmentId) => {
        const {showMessage, fetch_end, fetch_start} = this.props;
        fetch_start()
        getAppointmentsResultsApi(appointmentId).then(response => {
            console.log(response)
            if (response.status) {
                this.setState({examinations: mergeExaminations(response.data.services)});
                if(response.data.hasOwnProperty('responsible')){ //Ejecutada
                    this.fetchEmployees(response.data.SpecialityId)
                    const form = {
                        ResponsibleId: response.data.ResponsibleId,
                        SpecialityId: response.data.SpecialityId,
                        result: response.data.result
                    }
                    this.setState({form})
                }
            } else {
                showMessage({ message: response.message.text, variant:"error" })
            }
        }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }
    
    fetchSpecialities = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getSpecialitiesApi().then(response => {
        if (response.status)
          this.setState({specialities: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }
    
    fetchEmployees = (SpecialityId) => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getEmployeesAllApi("SpecialityId", SpecialityId).then(response => {
        if (response.status)
          this.setState({employees: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        const { target: { name, value } } = event
        if(name === "SpecialityId"){
            this.fetchEmployees(value)
            //Cleaning ResponsibleId because there are other employees now
            this.setState({form: {
                ...this.state.form,
                SpecialityId: value,
                ResponsibleId: ""
            }});
        } else {
            this.setState({form: _.set({...this.state.form}, name, value)});
        }
    };

    handleChangeGeneral = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleChangeExpansion = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };
      
      handleChangeTableValues = referenceValueId => event => {
        const { target: {value} } = event
        let currentExamChanging = this.state.expanded
        let examinations  = _.cloneDeep(this.state.examinations)
        let referenceValues = examinations[currentExamChanging].referenceValues
        referenceValues.forEach(rV=>{
            if(rV.id === referenceValueId)
                rV.value = value
        })
        this.setState({examinations})
    };
    
    examinationHasEmptyFields = (item) => {
        return hasArrayEmptyField(item.referenceValues)
    }
    
    appointmentHasEmptyExamination = () => {
        for(let ex of this.state.examinations){
            if(hasArrayEmptyField(ex.referenceValues))
                return true
        }
        return false
    }


    canBeSubmitted() {   
        const {isLoadingRequest} = this.props;

        if(!this.appointmentHasEmptyExamination()) //If all value has been set, validate responsible and result
            return !isLoadingRequest && !hasEmptyField(this.state.form)
        else //Still missing examinations
            return !isLoadingRequest
    }

    submit = () => {
        const params = this.props.match.params;
        const {appointmentId} = params;
        let data = {examinations: this.state.examinations}
        if(!this.appointmentHasEmptyExamination()){ //If all value has been set, add result and reponsible
                data = {...data, ...this.state.form}
        }
        this.props.attendAppointment(data, appointmentId)
    }
    
    renderTableSelected = (referenceValues) => {
        const params = this.props.match.params;
        const {option} = params;
        const TABLE_COLUMNS = [
            {
                key: "name",
                label: "Nombre"
            },
            {
                key: "group",
                label: "Sub grupo"
            },
            {
                key: "value",
                label: "Valor obtenido",
                render: (name, all) =>
                <TextField
                    id="value"
                    name="value"
                    value={name}
                    onChange={this.handleChangeTableValues(all.id)}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        readOnly: option === "show",
                    }}
                    autoComplete="off"
                />
            },
            {
                key: "unit",
                label: "Unidad",
                style: {
                  width: '10%',
                },
            },
            {
                key: "allValues",
                label: "Rangos refereciales",
                style: {
                  width: '35%',
                  whiteSpace: "pre-line"
                },
            },
        ];
        
        return (
            <MuiThemeProvider>
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={referenceValues}
                showCheckboxes={false}
                showFooterToolbar={false}
              />
            </MuiThemeProvider>
        );
    }

    render()
    {
        const { examinations, expanded, form, specialities, employees} = this.state;
        const params = this.props.match.params;
        const {option} = params;
        return (
            <div style={{ width: '100%' }}>
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/results">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Resultados
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            Registrar resultados
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Detalle de la cita</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                            {option === 'edit' && <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={this.submit}
                                >
                                    Guardar
                                </Button>
                            </FuseAnimate>}
                    </div>
                }
                content={
                    <div className="p-16 sm:p-24">
                        {examinations.length > 0 && !this.appointmentHasEmptyExamination() &&
                            <Grid className="pb-16" alignItems="center" container spacing={16}>
                                <Grid item md={6}>
                                <TextField
                                        label="Observaciones"
                                        id="result"
                                        name="result"
                                        value={form.result}
                                        onChange={this.handleChange}
                                        variant="outlined"                                       
                                        margin="normal"
                                        InputProps={{
                                            readOnly: option === "show",
                                        }}                                        
                                        autoComplete="off"
                                        fullWidth
                                        multiline={true}
                                        rows="3"
                                    />                                    
{/*@RSV eliminamos*                                    
                                    <TextField
                                        label="Observaciones"
                                        id="result"
                                        name="result"
                                        value={form.result}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                       
                                        margin="normal"
                                        
                                        InputProps={{
                                            readOnly: option === "show",
                                        }}
                                        autoComplete="off"
                                        fullWidth
                                        multiline={true}
                                        rows="3"
                                    />
*/}                                    
                                </Grid>
                                <Grid item md={3}>
                                    <TextField
                                      select
                                      label="Cargo"
                                      name="SpecialityId"
                                      value={form.SpecialityId}
                                      error={form.SpecialityId === ''}
                                      required
                                      onChange={this.handleChange}
                                      helperText="Por favor seleccione uno"
                                      margin="normal"
                                      InputProps={{
                                        readOnly: option === "show",
                                      }}
                                      variant="outlined"
                                      fullWidth
                                    >
                                      {specialities.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                          {option.name}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={3}>
                                    <TextField
                                      select
                                      label="Nombre"
                                      name="ResponsibleId"
                                      value={form.ResponsibleId}
                                      error={form.ResponsibleId === ''}
                                      required
                                      onChange={this.handleChange}
                                      helperText="Por favor seleccione uno"
                                      margin="normal"
                                      InputProps={{
                                        readOnly: option === "show",
                                      }}
                                      variant="outlined"
                                      fullWidth
                                    >
                                      {employees.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                          {option.fullName}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                </Grid>
                            </Grid>}
                        {examinations.map((ex, index)=> 
                            <ExpansionPanel expanded={expanded === index} onChange={this.handleChangeExpansion(index)} key={ex.id}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                  <Typography >{ex.name}</Typography>
                                  {hasArrayEmptyField(ex.referenceValues) ? 
                                    <Tooltip title="Faltan valores">
                                        <Icon className="ml-8" color="action">remove_circle_outline</Icon>
                                    </Tooltip>
                                  :
                                    <Tooltip title="Examen completado">
                                        <Icon className="ml-8" color="primary">check_circle_outline</Icon>
                                    </Tooltip>
                                  }
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <div>
                                    {this.renderTableSelected(ex.referenceValues)}
                                </div>
                                </ExpansionPanelDetails>
                              </ExpansionPanel>
                          )}
                    </div>
                }
                innerScroll
            />
            </div> 
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        attendAppointment: Actions.attendAppointment,
        showMessage,
        fetch_end,
        fetch_start
    }, dispatch);
}

function mapStateToProps({fuse})
{
    return {
        actions: fuse.menulink.data,
        navigation: fuse.navigation,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttendAppointment));
