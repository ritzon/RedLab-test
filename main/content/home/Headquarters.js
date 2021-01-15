import React, { Component } from 'react';
import { withStyles, Icon, Typography, Button, Table, TableHead, TableCell, TableRow, TableBody, Grid } from '@material-ui/core';
import { FuseAnimate, FusePageCarded, FusePageSimple } from '@fuse';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getHeadquartersAllApi } from '../../../api';
import DialogHeadquarter from './DialogHeadquarter';

const styles = theme => ({
    layoutRoot   : {},
    layoutToolbar: {
        padding: 0
    },
    layoutHeader : {
        height                        : 320,
        minHeight                     : 320,
        background                    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize                : 'cover',
        color                         : '#fff',
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    },
    formControl:{
        marginTop: '10px'
    }
});

class Headquarters extends Component {

    state = {
        headquarters: [],
        headquarter: {},
        open: false,
        dialogHeadquarter: false
    }

    componentDidMount = () => {
        this.fetchHeadquarters();
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

    closeDialogHeadquarter = () => {
        this.setState({dialogHeadquarter: false});
        this.fetchHeadquarters();
    }

    handleClose = () => {
        this.setState({open: false}, () => this.fetchHeadquarters());
    }

    handleCloseNew = () => {
        this.setState({dialogHeadquarter: false}, () => this.fetchHeadquarters());
    }

    handleEditHeadquarter = (item) => {
        this.setState({headquarter: item, open: true});
    }

    headquarterTable = () => {
        const { headquarters } = this.state;

        return (
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Opciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {headquarters.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <Button 
                            color="primary"
                            onClick={() => this.handleEditHeadquarter(row)}
                          >
                            Editar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        )
    }

    render()
    {
        const {classes} = this.props;

        return (
            <div>
            <FusePageSimple
                classes={{
                    root   : classes.layoutRoot,
                    header : classes.layoutHeader,
                    toolbar: classes.layoutToolbar
                }}
                content={
                    <FusePageCarded
                    classes={{
                        toolbar: "p-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header= {(
                        <div className={classNames(classes.root, "flex flex-1 w-full items-center justify-between")}>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/home">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Volver
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center"/>

                            <div className="flex flex-1 items-center justify-center px-12">
                                <Grid container>
                                    <Grid item xs={2} />
                                    <Grid item xs={5}>
                                        <div style={{display:"flex", justifyContent:"center"}}>
                                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                                <Icon className="text-32 mr-0 sm:mr-12">home</Icon>
                                            </FuseAnimate>
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography className="" variant="h6">
                                                    Sedes
                                                </Typography>
                                            </FuseAnimate>
                                        </div>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button
                                            variant="contained"
                                            onClick={() => this.setState({dialogHeadquarter: true})}
                                        >
                                            Agregar nueva sede
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    )}
                    content={
                        <div>
                            { this.headquarterTable() }
                        </div>
                    }
                    innerScroll
                />
                }
            />
            {this.state.open && <DialogHeadquarter 
                open={this.state.open}
                onClose={this.handleClose}
                headquarter={this.state.headquarter}
            />}
            {this.state.dialogHeadquarter && <DialogHeadquarter
                open={this.state.dialogHeadquarter} 
                onClose={this.handleCloseNew}
                create
            />}
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage,
        fetch_end,
        fetch_start
    }, dispatch);
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Headquarters));
