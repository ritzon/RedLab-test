import React, {Component} from 'react';
import {withStyles, Icon, Typography, Grid, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { BrowserView } from "react-device-detect";

const styles = () => ({
    root: {}
});

class AgreementsHeader extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-1 w-full items-center justify-between")}>

                <div className="flex items-center">
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                    <Grid container>
                        <Grid item xs={2}/>
                        <Grid item xs={5}>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Icon className="text-32 mr-0 sm:mr-12">folder_special</Icon>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="" variant="h6">Convenio</Typography>
                                </FuseAnimate>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <BrowserView>
                                <Button
                                    variant="contained"
                                    onClick={() => this.props.history.push("/apps/agreements/new")}
                                >
                                    Agregar convenio
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
        setSearchText: ''
    }, dispatch);
}

function mapStateToProps({specialtiesReducer})
{
    return {
        searchText: specialtiesReducer
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(AgreementsHeader));
