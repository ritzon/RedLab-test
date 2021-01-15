import React, { Component } from 'react';
import { withStyles, Button, Typography, TextField, Paper, Grid, MenuItem } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { months } from "constant";
import ReactToPrint from 'react-to-print';
import { reportExamMonthly } from '../../../api';
import { showMessage, fetch_end, fetch_start } from 'store/actions/fuse';
import { hasEmptyField } from 'Utils';
import { getAgreementsAllApi, getHeadquartersAllApi  } from '../../../api';

const styles = () => ({
    root: {
        backgroundColor: '#ffffff',
    },
    input: {
        color: '#000000'
    },
    icon: {
        color: '#000000'
    }
});

class ReportExamMonthlyHeader extends Component {

    state = {
        month: "",
        year: String(new Date().getFullYear()),
        AgreementId: "",
        HeadquarterId: "",
        isLoaded: false,
        agreements: [],
        headquarters: []
        
    }
    
    componentDidMount() {
        this.fetchAgreements();
        this.fetchHeadquarters();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value });
    }
    
    fetchAgreements = () => {
        const {showMessage, fetch_end, fetch_start} = this.props;
        fetch_start()
        getAgreementsAllApi().then(response => {
            if (response.status)
              this.setState({agreements: response.data})
            }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }

    fetchHeadquarters = () => {
        const {showMessage, fetch_end, fetch_start} = this.props;
        fetch_start()
        getHeadquartersAllApi().then(response => {
            if (response.status) {
              this.setState({headquarters: response.data});
            }
            }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }

    fetchReport = () => {
        const {month, year, AgreementId, HeadquarterId} = this.state
        const { showMessage, fetch_end, fetch_start, onFetchReport, onFailedReport } = this.props
        fetch_start()
        reportExamMonthly(month, year, AgreementId, HeadquarterId).then(response => {
            if (response.status){
                onFetchReport(response.data, month, year)
                this.setState({isLoaded: true})
            }
            else{
                showMessage({ message: response.message.text, variant: "error" })
                this.setState({isLoaded: false})
                onFailedReport()
            }
        }, err => {
            console.log(err)
            this.setState({isLoaded: false})
            onFailedReport()
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant: "error" })
        }).finally(fetch_end)
    }
    
    canBeSubmitted = () => {   
        const {month, year} = this.state
        const { isLoadingRequest } = this.props
        return (
            !isLoadingRequest &&
            !hasEmptyField({month, year})
        )
    }

    render() {
        const { classes } = this.props;
        const { isLoaded, headquarters, agreements } = this.state
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="flex items-center">
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                    <Grid container spacing={8} justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="" variant="h6">Reporte de exámenes mensual</Typography>
                                </FuseAnimate>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                <Paper className={classNames(classes.root, "flex items-center px-8 py-2 rounded-8")} elevation={1}>
                                    <TextField
                                      select
                                      variant="outlined"
                                      required
                                      name="month"
                                      value={this.state.month}
                                      style={{width: '60%'}}
                                      InputLabelProps={{
                                        className: classes.input,  
                                      }}
                                      InputProps={{
                                        className: classes.input,  
                                      }}
                                      SelectProps={{
                                        classes: {icon: classes.icon},
                                        displayEmpty: true
                                      }}
                                      onChange={this.handleChange}
                                    >
                                        <MenuItem value="" disabled>
                                          Mes
                                        </MenuItem>
                                        {Object.keys(months).sort().map((m) =>(
                                                <MenuItem key={m} value={m}>{months[m]}</MenuItem>
                                            )
                                        )}
                                    </TextField>
                                    <TextField
                                      type="number"
                                      variant="outlined"
                                      name="year"
                                      placeholder="Año"
                                      value={this.state.year}
                                      required
                                      error={!this.state.year}
                                      style={{width: '40%'}}
                                      InputProps={{
                                        className: classes.input,
                                      }}
                                      // eslint-disable-next-line
                                      inputProps={{ 
                                        min: 1,
                                        max: new Date().getFullYear()
                                      }}
                                      InputLabelProps={{
                                        className: classes.input,  
                                      }}
                                      onChange={this.handleChange}
                                    />
                                </Paper>
                            </FuseAnimate>
                        </Grid>
                        <Grid item xs={4}>
                            <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                <Paper className={classNames(classes.root, "flex items-center px-8 py-2 rounded-8")} elevation={1}>
                                    <TextField
                                      select
                                      variant="outlined"
                                      fullWidth
                                      name="AgreementId"
                                      value={this.state.AgreementId}
                                      InputLabelProps={{
                                        className: classes.input,  
                                      }}
                                      InputProps={{
                                        className: classes.input,  
                                      }}
                                      SelectProps={{
                                        classes: {icon: classes.icon},
                                        displayEmpty: true
                                      }}
                                      onChange={this.handleChange}
                                    >
                                        <MenuItem value="" disabled>
                                          Convenio
                                        </MenuItem>
                                        {agreements.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        
                                    </TextField>
                                    <TextField
                                      id="standard-select-currency"
                                      select
                                      variant="outlined"
                                      fullWidth
                                      name="HeadquarterId"
                                      value={this.state.HeadquarterId}
                                      InputLabelProps={{
                                        className: classes.input,  
                                      }}
                                      InputProps={{
                                        className: classes.input,  
                                      }}
                                      SelectProps={{
                                        classes: {icon: classes.icon},
                                        displayEmpty: true
                                      }}
                                      onChange={this.handleChange}
                                    >
                                        <MenuItem value="" disabled>
                                          Sede
                                        </MenuItem>
                                        {headquarters.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                    </TextField>
                                </Paper>
                            </FuseAnimate>
                        </Grid>
                        <Grid item xs={2}>
                            <Button 
                                className="mb-4"
                                variant="contained" 
                                fullWidth
                                disabled = {!this.canBeSubmitted() }
                                onClick={this.fetchReport}
                                >
                                Generar
                            </Button>
                            <ReactToPrint 
              					trigger={() => <Button disabled = {!this.canBeSubmitted() || !isLoaded} fullWidth variant="contained">Imprimir</Button>}
              					content={()	=> this.props.contentPrint}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showMessage,
        fetch_end,
        fetch_start
    }, dispatch);
}

function mapStateToProps({ fuse }) {
    return {
        isLoadingRequest: fuse.request.loading > 0,
    }
}
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(ReportExamMonthlyHeader));
