import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography, IconButton, Tooltip } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { hasEmptyField, hasArrayEmptyField } from 'Utils';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import Select from 'react-select';
import { saveServiceApi, saveMethodApi, saveReferenceValueApi, getServicesAllApi, getMethodsAllApi, getReferenceValuesAllApi } from '../../../api';
import DataTables from 'material-ui-datatables'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FuseUtils} from '@fuse';

import DialogCreateMaster from '../global/DialogCreateMaster';

const styles = theme => ({
    selected: {
        backgroundColor: "white !important",
    }
});

const fieldsNewReferenceValue = [
    {
        name: 'name',
        label: "Nombre",
    },
    {
        name: 'unit',
        label: "Unidad",
    }
]

const fieldsNewService = [
    {
        name: 'name',
        label: "Nombre",
    },
    {
        name: 'description',
        label: "Descripción",
    }
]

const fieldsNewMethod = [
    {
        name: 'name',
        label: "Nombre",
    },
    {
        name: 'description',
        label: "Descripción",
    }
]

const fieldsNewGroup = [
    {
        name: 'name',
        label: "Nombre",
    }
]


class Examination extends Component {
    state = {
        tabValue: 0,
        form    : null,
        services: [],
        methods: [],
        agreements: [],
        referenceValues: [],
        groups: [], //array of string
        autoSelect: "",
        dialogReferenceValue: false,
        dialogService: false,
        dialogMethod: false,
        dialogGroup: false
    };
    
    closeDialogReferenceValue = (response) => {
        this.setState({dialogReferenceValue: false});
        if(response) //If the new reference value has been added
            this.fetchReferenceValues()
    }
    
    closeDialogGroup = (response) => {
        this.setState({dialogGroup: false});
    }
    
    closeDialogService = (response) => {
        this.setState({dialogService: false});
        if(response) //If the new service has been added
            this.fetchServices()
    }

    closeDialogMethod = (response) => {
        this.setState({dialogMethod: false});
        if(response) //If the new service has been added
            this.fetchMethods()
    }
    
    openDialogGroup = () => {
        this.setState({dialogGroup: true})
    }
    
    openDialogReferenceValue = () => {
        this.setState({dialogReferenceValue: true})
    }
    
    openDialogService = () => {
        this.setState({dialogService: true})
    }

    openDialogMethod = () => {
        this.setState({dialogMethod: true})
    }
    
    //In this method I simulate fetching the api
    saveGroupSimulateApi = (form) => {
        return new Promise(resolve => {
            const {groups} = this.state
            let response
            if(groups.includes(form.name))
                response = {
                    status: false,
                    message:{
                        text: "Grupo - Se encuentra repetido"
                    }
                }
            else{
                this.setState({groups: [...groups, form.name]})
                response = {
                    status: true,
                    message:{
                        text: "Grupo - Creado exitosamente!"
                    }
                }
            }
            resolve(response)
        })
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };
    
    handleChangeAutoSelect = referenceId => value => {
        const { form } = this.state
        let referenceValues = _.cloneDeep(form.referenceValues)
        const index = referenceValues.findIndex(rV => rV.id === referenceId)
        if(value){
            //searching in selected reference values for the just selected now
            const indexDuplicate = referenceValues.findIndex(rV => rV.id === value.id)
            if(indexDuplicate > -1){ //If the referenceValue is duplicated
                this.props.showMessage({ message: 'Valor de referencia repetido', variant: "error" })
            } else {
                value.allValues = referenceValues[index].allValues //For conserve allValues (field)
                value.group = referenceValues[index].group //For conserve group (field)
                referenceValues[index] = value
                this.setState({form: {...form, referenceValues}})
            }
        }
        else{
            referenceValues[index] = { 
                id: FuseUtils.generateGUID(),
                allValues: referenceValues[index].allValues, //For conserve allValues (field)
                group: referenceValues[index].group, //For conserve group (field)
                name: '' }
            this.setState({form: {...form, referenceValues}})
        }
     };
     
     handleClickAddValue = () => {
        const { form } = this.state
        let referenceValues = _.cloneDeep(form.referenceValues)
        referenceValues.push({ id: FuseUtils.generateGUID(), allValues:'', name: '', group: '' })
        this.setState({form: {...form, referenceValues}})
     };
    
    componentDidMount()
    {   
        this.fetchServices()
        this.fetchMethods()
        this.fetchReferenceValues()
        const params = this.props.match.params;
        const {examinationId } = params;
        const { examination } = this.props
        if ( examinationId === 'new' )
            this.props.newExamination()
        else if (!Object(examination).length) //If examination is empty, it doesn't come from list, so get from API
            this.props.getExamination(examinationId)
        
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const { examination, isLoadingRequest } = this.props
        const params = this.props.match.params;
        const {examinationId } = params;
        if ( examination && !this.state.form && !isLoadingRequest )
        {
            this.setState({form: examination})
            if(examinationId !== "new"){
                //For only take groups once
                const arrayGroups = examination.referenceValues.map(rv=>rv.group).filter(group => group !== " ")
                const objSet = new Set(arrayGroups)
                const groups = Array.from(objSet) //Parsing set to array
                this.setState({ groups })
            }
        }
    }
    
    fetchServices = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getServicesAllApi().then(response => {
        if (response.status)
          this.setState({services: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }

    fetchMethods = () => {
        const {showMessage, fetch_end, fetch_start} = this.props
        fetch_start()
        getMethodsAllApi().then(response => {
          if (response.status)
            this.setState({methods: response.data})
        }, err => {
          console.log(err)
          showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
      }
    
    fetchReferenceValues = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getReferenceValuesAllApi().then(response => {
        if (response.status)
          this.setState({referenceValues: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }

    canBeSubmitted = () => {   
        const fieldsCanBeEmpty = ["unit","typeSample","volume","supplies","storageTemperature","fastingConditions","runFrequency","processTime","reportTime"]
        const { form } = this.state
        const { isLoadingRequest, examination } = this.props
        return (
            !isLoadingRequest &&
            !_.isEqual(examination, form) &&
            !hasEmptyField(form, fieldsCanBeEmpty) && 
            !hasArrayEmptyField(form.referenceValues, ["group"])
        )
    }
    
    submit = () => {
      
      const { form } = this.state;
      const { saveExamination, editExamination} = this.props
      const params = this.props.match.params;
      const {examinationId } = params;
      if ( examinationId === 'new' )
        saveExamination(form)
      else
        editExamination(form, examinationId)
    }
    
    handleChangeTableValues = (event, referenceValueId) => {
        const { target: {value, name} } = event
        const { form } = this.state
        let referenceValues = _.cloneDeep(this.state.form.referenceValues)
        referenceValues.forEach(rV=>{
            if(rV.id === referenceValueId)
                rV[name] = value
        })
        console.log(this.props.examination)
        this.setState({form: {...form, referenceValues}})
    };
    
    removeReferenceValue = (referenceValueId) => {
        const { form } = this.state
        let referenceValues = _.cloneDeep(this.state.form.referenceValues)
        referenceValues = referenceValues.filter(rV=> rV.id !== referenceValueId)
        this.setState({form: {...form, referenceValues}})
    }
    
    stylesAutoSelects = (all) => ({
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
          ...provided,
          height: "56px",
          borderColor: all.name ?  provided.borderColor : "red !important"
      })
    })
    
    renderTableSelected = () => {
        const { referenceValues, groups } = this.state
        const { classes } = this.props
        const TABLE_COLUMNS = [
            {
                key: "id",
                label: "Nombre",
                render: (name, all) =>
                <Select
                    placeholder="Escoge un valor"
                    defaultInputValue=""
                    name={String(name)}
                    id={String(name)}
                    isClearable
                    
                    styles={this.stylesAutoSelects(all)}
                    menuPortalTarget={document.body}
                    menuPlacement="top"
                    //openMenuOnClick={false}
                    value={all}
                    onChange={this.handleChangeAutoSelect(name)}
                    options={referenceValues}
                    noOptionsMessage={()=>"No hay valores"}
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
                key: "group",
                label: "Sub grupo",
                render: (value, all) =>
                <TextField
                    name="group"
                    //error={!value}
                    //required
                    value={value}
                    onChange={(event) => this.handleChangeTableValues(event, all.id)}
                    variant="outlined"
                    fullWidth
                    select
                >
                    <MenuItem value=" " classes={{ selected: classes.selected }}>
                        <Button color="primary" onClick={this.openDialogGroup} fullWidth variant="contained">
                          Crear nuevo
                        </Button>
                    </MenuItem>
                    <MenuItem value=" ">
                        Sin sub grupo
                    </MenuItem>
                      {groups.map(group => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      ))}
                </TextField>
                
            },
            {
                key: "allValues",
                label: "Rangos refereciales",
                style: {
                  width: '35%',
                },
                render: (name, all) =>
                <TextField
                    className="text-20"
                    id={String(all.id)}
                    name="allValues"
                    error={!all.allValues}
                    required
                    value={all.allValues}
                    onChange={(event) => this.handleChangeTableValues(event, all.id)}
                    variant="outlined"
                    rows="3"
                    multiline
                    fullWidth
                />
                
            },
            {
                key: "options",
                label: "Opciones",
                style: {
                  width: '8%',
                },
                render: (name, all) => (
                    <Tooltip title="Eliminar">
                        <IconButton onClick={() => this.removeReferenceValue(all.id)} color="primary" >
                            <Icon>delete</Icon>
                        </IconButton>
                    </Tooltip>
                )
            }
        ];
        
        return (
            <MuiThemeProvider>
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={this.state.form.referenceValues}
                showCheckboxes={false}
                showFooterToolbar={false}
              />
            </MuiThemeProvider>
        );
    }


    render()
    {   
        const {tabValue, form, services, methods } = this.state;
        const {params : {examinationId}} = this.props.match;
        return (
            <div>
                <FusePageCarded
                    classes={{
                        toolbar: "p-0",
                        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        form && (
                            <div className="flex flex-1 w-full items-center justify-between">
    
                                <div className="flex flex-col items-start max-w-full">
    
                                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                        <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/examinations">
                                            <Icon className="mr-4 text-20">arrow_back</Icon>
                                            Exámenes
                                        </Typography>
                                    </FuseAnimate>
    
                                    <div className="flex items-center max-w-full">
                                        <div className="flex flex-col min-w-0">
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography className="text-16 sm:text-20 truncate">
                                                    {examinationId === "new" ? "Nuevo examen" : form.name}
                                                </Typography>
                                            </FuseAnimate>
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography variant="caption">Detalle del examen</Typography>
                                            </FuseAnimate>
                                        </div>
                                    </div>
                                </div>
                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        disabled={!this.canBeSubmitted()}
                                        onClick={() => this.submit()}
                                    >
                                        Guardar
                                    </Button>
                                </FuseAnimate>
                            </div>
                        )
                    }
                    contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        //scrollable
                        //scrollButtons="auto"
                        centered
                        variant="fullWidth"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Datos básicos"/>
                        <Tab className="h-64 normal-case" label="Valores referenciales"/>
                        <Tab className="h-64 normal-case" label="Datos técnicos"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                    <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Nombre"
                                            id="name"
                                            name="name"
                                            error={form.name === ''}
                                            required
                                            value={form.name}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Servicio"
                                          name="ServiceId"
                                          value={form.ServiceId}
                                          error={form.ServiceId === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          <MenuItem value="">
                                            <Button color="primary" onClick={this.openDialogService} fullWidth variant="contained">
                                              Crear nuevo
                                            </Button>
                                          </MenuItem>
                                          {services.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Metodología"
                                          name="MethodId"
                                          value={form.MethodId}
                                          error={form.MethodId === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          <MenuItem value="">
                                            <Button color="primary" onClick={this.openDialogMethod} fullWidth variant="contained">
                                              Crear nuevo
                                            </Button>
                                          </MenuItem>
                                          {methods.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                    </div>
                                    <TextField
                                        multiline={true}
                                        className="mt-8 mb-16"
                                        label="Indicaciones"
                                        id="indications"
                                        name="indications"
                                        value={form.indications}
                                        error={form.indications === ''}
                                        required
                                        onChange={this.handleChange}
                                        rows="5"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>
                                <Button onClick={this.openDialogReferenceValue} color="primary" variant="contained">
                                    Crear valor
                                </Button>

                                    { this.renderTableSelected() }
                                    
                                    <p align="center">
                                      <Button
                                        className="whitespace-no-wrap mt-8"
                                        variant="contained"
                                        onClick={this.handleClickAddValue}
                                       >
                                        Agregar otro valor al examen
                                        </Button>  
                                    </p>

                                </div>
                            )}
                            {tabValue === 2 &&
                            (
                                <div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Tipo(s) de muestra"
                                            id="typeSample"
                                            name="typeSample"
                                            //error={form.typeSample === ''}
                                            //required
                                            value={form.typeSample}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Volumen"
                                            id="volume"
                                            name="volume"
                                            //error={form.volume === ''}
                                            //required
                                            value={form.volume}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Insumos"
                                            id="supplies"
                                            name="supplies"
                                            //error={form.supplies === ''}
                                            //required
                                            value={form.supplies}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Temperatura de conservación"
                                            id="storageTemperature"
                                            name="storageTemperature"
                                            //error={form.storageTemperature === ''}
                                            //required
                                            value={form.storageTemperature}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Condiciones de ayuno"
                                            id="fastingConditions"
                                            name="fastingConditions"
                                            //error={form.fastingConditions === ''}
                                            //required
                                            value={form.fastingConditions}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            label="Frecuencia de corridas"
                                            autoComplete="off"
                                            id="runFrequency"
                                            name="runFrequency"
                                            //error={form.runFrequency === ''}
                                            //required
                                            value={form.runFrequency}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Hora de proceso"
                                            id="processTime"
                                            name="processTime"
                                            //error={form.processTime === ''}
                                            //required
                                            value={form.processTime}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            className="mt-8 mb-16 mr-8 ml-8"
                                            autoComplete="off"
                                            label="Tiempo de reporte"
                                            id="reportTime"
                                            name="reportTime"
                                            //error={form.reportTime === ''}
                                            //required
                                            value={form.reportTime}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                    
                    innerScroll
                />
                {this.state.dialogReferenceValue && <DialogCreateMaster
                    dialog={this.state.dialogReferenceValue} 
                    onResponse={this.closeDialogReferenceValue}
                    fields={fieldsNewReferenceValue}
                    notRequiredField="unit"
                    title="Nuevo valor de referencia"
                    onFetchApi={saveReferenceValueApi}
                />}
                {this.state.dialogService && <DialogCreateMaster
                    dialog={this.state.dialogService} 
                    onResponse={this.closeDialogService}
                    fields={fieldsNewService}
                    title="Nuevo servicio"
                    onFetchApi={saveServiceApi}
                />}
                {this.state.dialogMethod && <DialogCreateMaster
                    dialog={this.state.dialogMethod} 
                    onResponse={this.closeDialogMethod}
                    fields={fieldsNewMethod}
                    title="Nuevo método"
                    onFetchApi={saveMethodApi}
                />}
                {this.state.dialogGroup && <DialogCreateMaster
                    dialog={this.state.dialogGroup} 
                    onResponse={this.closeDialogGroup}
                    fields={fieldsNewGroup}
                    title="Nuevo sub grupo"
                    onFetchApi={this.saveGroupSimulateApi}
                />}
                
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      newExamination : Actions.newExamination,
      saveExamination : Actions.saveExamination,
      editExamination : Actions.editExamination,
      getExamination : Actions.getExamination,
      showMessage,
      fetch_end,
      fetch_start
    }, dispatch);
}

function mapStateToProps({examinationsReducer, fuse})
{
    return {
        isLoadingRequest: fuse.request.loading > 0,
        examination: examinationsReducer.examination.data
    }
}

export default withReducer('examinationsReducer', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Examination))));