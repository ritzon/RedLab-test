import React, {Component} from 'react';
import {withStyles, Icon, IconButton, Typography, Paper, Input, Grid} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { BrowserView } from "react-device-detect";
import * as Actions from './store/actions';

const styles = () => ({
    root: {
        backgroundColor: '#ffffff'
    },
    input: {
        color: '#000000'
    }
});

class PatientExamsHeader extends Component {

    state = {
        searchText: "",
        user_id: localStorage.getItem('user_id')
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick = () => {
        const { searchText, user_id } = this.state;
        this.props.searchPatientAppointments('date', searchText, user_id);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter')
            this.handleClick();
    }

    render()
    {   
        const { searchText } = this.state;
        const {classes} = this.props;
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="flex items-center">
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                    <Grid container>
                        <Grid item xs={3}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Icon className="text-32 mr-0 sm:mr-12">calendar_today</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="" variant="h6">Mis Resultados</Typography>
                            </FuseAnimate>
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <BrowserView>
                            <FuseAnimate animation="transition.slideDownIn" delay={300}>
                                <Paper className={classNames(classes.root, "flex items-center w-full max-w-512 px-8 py-4 rounded-8")} elevation={1}>
                                    <IconButton onClick={this.handleClick}>
                                        <Icon className="mr-8" color="primary">search</Icon>
                                    </IconButton>
                                    <Input
                                        placeholder="Buscar"
                                        className={classNames(classes.input, "flex flex-1")}
                                        disableUnderline
                                        fullWidth
                                        type="date"
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
                        <Grid item xs={5}/>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        searchPatientAppointments: Actions.searchPatientAppointments,
    }, dispatch);
}

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(PatientExamsHeader));
