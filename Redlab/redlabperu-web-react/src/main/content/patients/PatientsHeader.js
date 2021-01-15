import React, {Component} from 'react';
import {withStyles, Icon, Button, IconButton, Typography, TextField, MenuItem, Paper, Input, Grid} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import classNames from 'classnames';
import { BrowserView } from "react-device-detect";

const styles = () => ({
    root: {
        backgroundColor: '#ffffff'
    },
    input: {
        color: '#000000'
    }
});

const filterLabel = {
    "fullname" : "nombre",
    "dni" : "documento",
}

class PatientsHeader extends Component {

    state = {
        searchText: "",
        criteria: "dni"
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick = () => {
        this.props.searchPatients(this.state.criteria, this.state.searchText);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter')
            this.handleClick();
    }

    render()
    {
        const {classes} = this.props;
        const {searchText, criteria} = this.state;
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="flex items-center">
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                    <Grid container>
                        <Grid item xs={4}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Icon className="text-32 mr-0 sm:mr-12">supervisor_account</Icon>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="" variant="h6">Pacientes</Typography>
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
                                      value={criteria}
                                      required
                                      onChange={this.handleChange}
                                      InputProps={{
                                        className: classes.input,
                                        startAdornment: <Icon color="primary">keyboard_arrow_down</Icon>
                                      }}
                                    >
                                        <MenuItem value={"dni"}>Documento</MenuItem>
                                        <MenuItem value={"fullname"}>Nombre</MenuItem>
                                    </TextField>
                                    <IconButton onClick={this.handleClick}>
                                        <Icon className="mr-8" color="primary">search</Icon>
                                    </IconButton>
                                    <Input
                                        placeholder={`Buscar por ${filterLabel[criteria]}`}
                                        className={classNames(classes.input)}
                                        disableUnderline
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
                        <Grid item xs={1}/>
                        <Grid item xs={2}>
                            <BrowserView>
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Button 
                                    variant="contained" 
                                    onClick={() => this.props.history.push("/apps/patients/new")}
                                    >
                                    Nuevo paciente
                                </Button>
                            </FuseAnimate>
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
        searchPatients: Actions.searchPatients
    }, dispatch);
}

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(PatientsHeader));
