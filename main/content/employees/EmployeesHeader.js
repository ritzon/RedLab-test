import React, {Component} from 'react';
import {withStyles, Icon, Button, IconButton, Typography, TextField, Paper, Input, Grid, MenuItem} from '@material-ui/core';
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

class EmployeesHeader extends Component {

    state = {
        searchText: "",
        criteria: "fullname"
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick = () => {
        this.props.searchEmployees(this.state.criteria, this.state.searchText);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter' && this.state.searchText !== "")
            this.handleClick();
    }

    render()
    {
        const {classes} = this.props;
        const {searchText} = this.state;
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="flex items-center">
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                    <Grid container>
                        <Grid item xs={3}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img src="assets/images/backgrounds/personal_lab_1.png" alt="icon" />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="" variant="h6">Personal de Laboratorio</Typography>
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
                                      onChange={this.handleChange}
                                      InputProps={{
                                        className: classes.input,
                                        startAdornment: <Icon color="primary">keyboard_arrow_down</Icon>
                                      }}
                                    >
                                        <MenuItem value={"fullname"}>Apellido</MenuItem>
                                        <MenuItem value={"dni"}>DNI</MenuItem>
                                        <MenuItem value={"passport"}>Pasaporte</MenuItem>
                                    </TextField>
                                    <IconButton onClick={this.handleClick} disabled={this.state.searchText === ""}>
                                        <Icon className="mr-8" color="primary">search</Icon>
                                    </IconButton>
                                    <Input
                                        placeholder="Buscar"
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
                        <Grid item xs={3}>
                            <BrowserView>
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Button 
                                    variant="contained" 
                                    onClick={() => this.props.history.push("/apps/employees/new")}
                                    >
                                    nuevo personal
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
        searchEmployees: Actions.searchEmployees
    }, dispatch);
}

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(EmployeesHeader));
