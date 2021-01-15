import React, {Component} from 'react';
import {withStyles, Icon, Button, IconButton, Typography, TextField, Paper, Input, Grid, MenuItem} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { BrowserView } from "react-device-detect";

const styles = () => ({
    root: {
        backgroundColor: '#ffffff'
    },
    input: {
        color: '#000000',
        fill: '#000000'
    },
    select: {
        color: '#000000',
    }
});

class AppointmentsHeader extends Component {
    state = {
        searchText: "",
        criteria: "code",
        type: "string"
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeSelect = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if (event.target.value === 'date')
            this.setState({type: "date"});
        else
            this.setState({type: "string"});
    }

    handleClick = () => {
        const { appointmentStatus = '' } = this.props 
        //If parent doesn't assign this prop, it'll be empty so get all status
        this.props.searchAppointments(this.state.criteria, this.state.searchText, appointmentStatus);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter' && this.state.searchText !== '')
            this.handleClick();
    }

    render()
    {   
        const { searchText } = this.state;
        const {classes, showResults  = false} = this.props;
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="flex items-center">
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                    <Grid container>
                        <Grid item xs={4}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <img src="assets/images/backgrounds/citas_lab_11.png" alt="icon" />
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="" variant="h6">
                                    {showResults ? 'Resultados de examenes' : "Citas de Laboratorio"}
                                </Typography>
                            </FuseAnimate>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <BrowserView>
                            <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                <Paper className={classNames(classes.root, "flex items-center px-8 py-2 rounded-8")} elevation={1}>
                                    <TextField
                                      id="standard-select-currency"
                                      className={classNames(classes.select)}
                                      select
                                      variant="outlined"
                                      name="criteria"
                                      value={this.state.criteria}
                                      required
                                      onChange={this.handleChangeSelect}
                                      InputProps={{
                                        className: classes.input,
                                        startAdornment: <Icon color="primary">keyboard_arrow_down</Icon>
                                      }}
                                    >
                                        <MenuItem value={"code"}>Codigo</MenuItem>
                                        <MenuItem value={"date"}>Fecha</MenuItem>
                                        <MenuItem value={"dni"}>DNI</MenuItem>
                                        <MenuItem value={"passport"}>Pasaporte</MenuItem>
                                    </TextField>
                                    <IconButton onClick={this.handleClick} disabled={searchText === ''}>
                                        <Icon className="mr-8" color="primary">search</Icon>
                                    </IconButton>
                                    <Input
                                        placeholder="Buscar"
                                        className={classNames(classes.input)}
                                        disableUnderline
                                        type={this.state.type}
                                        name="searchText"
                                        value={searchText}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Search'
                                        }}
                                        onChange={this.handleChange}
                                        onKeyPress={this.handleKeyPress}
                                    />
                                </Paper>
                            </FuseAnimate>
                            </BrowserView>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={2} justify="right">
                            <BrowserView>
                            {!showResults && (
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Button 
                                        variant="contained"  
                                        onClick={() => this.props.history.push("/apps/appointments/new")}
                                        >
                                        Asignar cita
                                    </Button>
                                </FuseAnimate>
                            )}
                            </BrowserView>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        searchAppointments: Actions.searchAppointments,
    }, dispatch);
}

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(AppointmentsHeader));
