import React, { Component } from 'react';
import { List, ListItem, ListItemAvatar, withStyles, IconButton, Tooltip, Icon, Table, 
    TableBody, TableCell, TablePagination, TableRow, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import { getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/appointments/store/actions';
import AppointmentsTableHead from './AppointmentsTableHead';
import DialogAppointment from './DialogAppointment';
import DialogPrintExams from '../patientExamination/DialogPrintExams';
import DialogPrintAppointment from './DialogPrintAppointment';
import NumberFormat from 'react-number-format';
import _ from '@lodash';

import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});


class AppointmentsTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.appointments,
        page: 0,
        rowsPerPage: isMobile ? 3 : 5,
        user_id: localStorage.getItem('user_id'),
        dialog: false,
        print: false,
        printAppointment: false,
        appointment: {},
        actions: null
    };

    componentDidMount() {
        this.handleMoreAppointments();
        this.getRoleActions();
    }

    componentWillUnmount(){
        this.props.clearAppointments()
    }

    componentDidUpdate(prevProps, prevState) {
        const { appointments, searchText, appointmentStatus } = this.props;
        
        if(appointmentStatus !== prevProps.appointmentStatus){ //If this component is being watch from results and tabs change
            this.props.clearAppointments()
            this.handleMoreAppointments();
        }

        if (!_.isEqual(appointments, prevProps.appointments) || !_.isEqual(searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(appointments, searchText);
            this.setState({ data })
        }
    }

    getRoleActions() {
        const { actions, location } = this.props;
        const navigation = JSON.parse(localStorage.getItem('navigation'));
        
        if (navigation) {
            const permissions = getRoleFunctionActions(navigation[0].children, actions, location.pathname, 'url');
            this.setState({actions: permissions});
        }
    }

    getFilteredArray = (data, searchText) => {
        if (searchText.length === 0) {
            return data;
        }
        return _.filter(data, item => item.validation_number.toLowerCase().includes(searchText.toLowerCase()));
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(() => ({ selected: this.state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleEditAppointment = (item) => {
         this.props.history.push('/apps/appointments/' + item.id);
    };

    /*
    handleViewAppointment = (item) => {
        this.props.history.push(`/apps/appointments/${item.id}/show`);
    }
    */

    handleAttendAppointment = (item) => {
        /*
        Uncomment this lines for enabled show/edit views
        const { appointmentStatus } = this.props 
        if(appointmentStatus === 'S') //Solicitada can be edited
            this.props.history.push(`/apps/results/${item.id}/edit`);
        else //Ejecutada only can be shown
            this.props.history.push(`/apps/results/${item.id}/show`);
        */
       this.props.history.push(`/apps/results/${item.id}/edit`);
    };
    
    handleDeleteAppointment = (appointment) => {
        this.setState({appointment}, () => this.setState({dialog: true}));
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMoreAppointments);
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMoreAppointments);
    };

    handleClickPrint = (appointment) => {
        this.setState({appointment, print: true});
    }

    handleClickPrintAppointment = (appointment) => {
        this.setState({appointment, printAppointment: true});
    }

    closeDialog = (deleteFlag) => {
        this.setState({dialog: false});
        if (deleteFlag) {
            const {appointment, data} = this.state;
            let index = data.indexOf(appointment);
            if (index > -1)
                data.splice(index, 1)
            this.setState(data);
        }
    }

    closePrint = () => {
        this.setState({print: false});
    }

    closePrintAppointment = () => {
        this.setState({printAppointment: false});
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMoreAppointments = () => {
        const { appointmentStatus = '' } = this.props 
        //If parent doesn't assign this prop, it'll be empty so get all status
        let {page, rowsPerPage} = this.state
        page++;
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getAppointmentsMobile(start, end, appointmentStatus);
        else
            this.props.getAppointments(start, end, appointmentStatus);
    }

    handleMoreAppointmentsMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMoreAppointments)
    }

    renderOptions = (item) => {
        const { actions } = this.state;
        const { showResults = false, appointmentStatus } = this.props
        if(showResults)
            return (
                <div style={{display:'flex'}}>
                    <Tooltip title="Asignar Resultados">
                        <Button size="small" color="primary" onClick={() => this.handleAttendAppointment(item)}>
                            {appointmentStatus === 'E' ? 'Editar' : 'Asignar resultados'}
                        </Button>
                    </Tooltip>
                    {appointmentStatus === 'E' && (
                        <Tooltip title="Ver resultados">
                            <Button size="small" color="primary" onClick={() => this.handleClickPrint(item)}>
                                Ver resultados
                            </Button>
                        </Tooltip>
                    )}
                </div>
            )
        else
            return (
                <div style={{display:'flex'}}>
                    <Tooltip title="Editar">
                        <Button size="small" color="primary" onClick={() => this.handleEditAppointment(item)}>
                            Editar
                        </Button>
                    </Tooltip>
                    <Tooltip title="Imprimir">
                        <Button size="small" color="primary" onClick={() => this.handleClickPrintAppointment(item)}>
                            Imprimir
                        </Button>
                    </Tooltip>
                    {actions && actions.canDelete && (
                    <Tooltip title="Eliminar">
                        <Button size="small" onClick={() => this.handleDeleteAppointment(item)} color="primary"  >
                            Eliminar
                        </Button>
                    </Tooltip>
                    )}
                </div>
            )
    }

    renderOptionsMobile = (item) => {
        const { actions } = this.state;
        const { showResults = false, appointmentStatus } = this.props

        if (showResults) {
            return (
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Tooltip title="Resultados">
                        <IconButton   onClick={() => this.handleAttendAppointment(item)} color="primary"  >
                            <Icon>poll</Icon>
                        </IconButton>
                    </Tooltip>
                    {appointmentStatus === 'E' && (
                    <Tooltip title="Ver resultados">
                        <IconButton  onClick={() => this.handleClickPrint(item)} color="primary"  >
                            <Icon>print</Icon>
                        </IconButton>
                    </Tooltip>
                    )}
                </div>
            )
        } else {
            return (
                <div style={{display:'flex', justifyContent:'center'}}>
                    {actions && actions.canEdit && (
                    <Tooltip title="Editar">
                        <IconButton   onClick={() => this.handleEditAppointment(item)} color="primary"  >
                            <Icon>edit</Icon>
                        </IconButton>
                    </Tooltip>
                    )}
                    {item.status !== 'E' && (
                        <span>
                            {actions && actions.canDelete && (
                            <Tooltip title="Eliminar">
                                <IconButton  onClick={() => this.handleDeleteAppointment(item)} color="primary"  >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                            )}
                        </span>
                    )}
                </div>
            )
        }
    }

    renderTableDesktop = () => {
        const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
        const { totalAppointments, isLoadingRequest } = this.props;
        
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <AppointmentsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {data.map((n,index) => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isSelected}
                                        //onClick={event => this.handleShowRefill(n)}
                                        >   
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.code}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.dateAppointmentEU}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.time12h}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                <NumberFormat 
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    prefix="S/."
                                                    value={n.totalPrice}
                                                    displayType="text"
                                                />
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.client.name} {n.client.lastNameP}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {this.renderOptions(n)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {!isLoadingRequest && totalAppointments === 0 && 
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>Citas no encontradas</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalAppointments}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5,10,25,50]}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Página anterior'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Próxima página'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    labelRowsPerPage= "Filas por página"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
            </div>
        );
    }

    renderListMobile = () => {
        const { data } = this.state;
        const { totalAppointments, isLoadingRequest } = this.props;
        
        return (
            <List>
                {data.map((n,i) =>
                    <ListItem key={i}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>calendar_today</Icon>
                                </ListItemAvatar>
                                <p>{n.dateAppointmentEU} {n.time12h}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>person</Icon>
                                </ListItemAvatar>
                                <p>{n.client.name} {n.client.lastNameP}</p>
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                            {this.renderOptionsMobile(n)}
                        </div>
                    </ListItem>)}
                    {totalAppointments!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMoreAppointmentsMobile()} disabled={this.props.isLoadingRequest} color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalAppointments === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
                        <p style={{fontSize:'20px'}}>Citas no encontradas</p>
                    </ListItem>}
                    
            </List>
        )
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <BrowserView>
                    {this.renderTableDesktop()}
                </BrowserView>                        
                <MobileView> 
                    {this.renderListMobile()}
                </MobileView>
                { this.state.dialog && (
                    <DialogAppointment 
                        dialog={this.state.dialog}
                        appointment={this.state.appointment}
                        onClose={this.closeDialog}
                    />
                )}
                {this.state.print && (
                    <DialogPrintExams
                        appointment={this.state.appointment}
                        dialog={this.state.print} 
                        onClose={this.closePrint}
                    />
                )}
                {this.state.printAppointment && (
                    <DialogPrintAppointment
                        appointment={this.state.appointment}
                        dialog={this.state.printAppointment} 
                        onClose={this.closePrintAppointment}
                    />
                )}
            </div>
        );
    }

}
 
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAppointments: Actions.getAppointments,
        getAppointmentsMobile: Actions.getAppointmentsMobile,
        clearAppointments: Actions.clearAppointments
    }, dispatch);
}

function mapStateToProps({ appointmentsReducer, fuse }) {
    return {
        appointments: appointmentsReducer.appointments.data,
        totalAppointments: appointmentsReducer.appointments.total,
        searchText: appointmentsReducer.appointments.searchText,
        openDialog: appointmentsReducer.appointment.openDialog,
        navigation: fuse.navigation,
        actions: fuse.menulink.data,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AppointmentsTable)));
