import React, {Component} from 'react';
import {withStyles, Icon, Button, IconButton, Typography, Paper, Input, Grid} from '@material-ui/core';
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

class ExaminationsHeader extends Component {

    state = {
        searchText: ""
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick = () => {
        this.props.searchExaminations(this.state.searchText);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter')
            this.handleClick();
    }

    render()
    {
        const {classes} = this.props;
        const { searchText } = this.state;
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                <div className="flex items-center">
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                    <Grid container>
                        <Grid item xs={3}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <img src="assets/images/backgrounds/examenes_lab_icon.png" alt="icon" />
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="" variant="h6">Exámenes</Typography>
                            </FuseAnimate>
                            </div>
                        </Grid>
                        
                        <Grid item xs={5}>
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
                            <Button 
                                variant="contained" 
                                onClick={() => this.props.history.push("/apps/examinations/new")}
                                >
                                Agregar examen
                            </Button>
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
        searchExaminations: Actions.searchExaminations
    }, dispatch);
}

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(ExaminationsHeader));
