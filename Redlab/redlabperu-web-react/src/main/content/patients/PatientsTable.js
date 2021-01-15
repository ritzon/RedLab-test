import React, { Component } from 'react';
import { Button, List, ListItem, ListItemAvatar, withStyles, IconButton, Tooltip, Icon, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import { getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/patients/store/actions';
import PatientsTableHead from './PatientsTableHead';
import DialogOpPatient from './DialogOpPatient';
import _ from '@lodash';
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});


class PatientsTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.patients,
        page: 0,
        rowsPerPage: isMobile ? 3 : 5,
        dialog: false,
        flagDelete: false,
        patient: {},
        actions: null
    };

    componentDidMount() {
        this.props.clearPatients();
        this.handleMorePatients();
        this.getRoleActions();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.patients, prevProps.patients) || !_.isEqual(this.props.searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(this.props.patients, this.props.searchText);
            this.setState({ data })
        }
    }

    componentWillUnmount(){
        this.props.clearPatients();
        
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

    handleClickEdit = (patient) => {
        this.props.setPatient(patient)
        this.props.history.push('/apps/patients/' + patient.person.id);
    }

    handleClickDelete = (patient) => {
        this.setState({patient, dialog: true, flagDelete: true})
    }
    
    handleClickShow = (patient) => {
        this.setState({patient, dialog: true, flagDelete: false})
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMorePatients);
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMorePatients);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMorePatients = () => {
        let {page, rowsPerPage } = this.state
        page++
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getPatientsMobile(start, end)
        else
            this.props.getPatients(start, end)
    }

    handleMorePatientsMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMorePatients)
    }


    renderOptionsMobile = (item) => {
        const { actions } = this.state;

        return (
            <div style={{display:'flex', justifyContent:'center'}}>
                <Tooltip title="Visualizar">
                    <IconButton onClick={() => this.handleClickShow(item)} color="primary" >
                        <Icon>visibility</Icon>
                    </IconButton>
                </Tooltip>
                 <Tooltip title="Editar">
                    <IconButton onClick={() => this.handleClickEdit(item)} color="primary" >
                        <Icon>edit</Icon>
                    </IconButton>
                </Tooltip>
                {actions && actions.canDelete && (
                <Tooltip title="Eliminar">
                    <IconButton onClick={() => this.handleClickDelete(item)} color="primary" >
                        <Icon>delete</Icon>
                    </IconButton>
                </Tooltip>
                )}
            </div>
        )
    }
    
    renderOptions = (item) => {
        const { actions } = this.state;

        return (
            <div style={{display:'flex', justifyContent:'center'}}>
                <Tooltip title="Visualizar">
                    <Button size="small" color="primary" onClick={() => this.handleClickShow(item)}>
                        Ver
                    </Button>
                </Tooltip>
                 <Tooltip title="Editar">
                    <Button size="small" color="primary" onClick={() => this.handleClickEdit(item)}>
                        Editar
                    </Button>
                </Tooltip>
                {actions && actions.canDelete && (
                <Tooltip title="Eliminar">
                    <Button size="small" color="primary" onClick={() => this.handleClickDelete(item)}>
                        Eliminar
                    </Button>
                </Tooltip>
                )}
            </div>
        )
    }

    renderTableDesktop = () => {
        const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
        const { totalPatients,isLoadingRequest } = this.props;

        return (
            <div className="w-full flex flex-col ">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <PatientsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={6}
                        />

                        <TableBody>
                            {data.map((n, index) => {
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
                                        //onClick={event => this.handleClick(n)}
                                        >
                                            <TableCell component="th" scope="row">
                                                {n.typeDoc.dni}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.person.name} {n.person.lastNameP} {n.person.lastNameM}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.person.phoneNumber}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {this.renderOptions(n)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {!isLoadingRequest && totalPatients === 0 && 
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>No hay pacientes registrados</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalPatients}
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
    
    closeDialog = () => {
        this.setState({dialog: false});
    }

    renderListMobile = () => {
        const { data } = this.state;
        const { totalPatients, isLoadingRequest } = this.props;
        return (
            <List>
                {data.map((n,index) =>
                    <ListItem  key={index}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>contact_mail</Icon>
                                </ListItemAvatar>
                                <p>{n.typeDoc.dni}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>perm_identity</Icon>
                                </ListItemAvatar>
                                <p>{n.person.name} {n.person.lastNameP}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>phone</Icon>
                                </ListItemAvatar>
                                <p>{n.person.phoneNumber}</p>
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                            {this.renderOptionsMobile(n)}
                        </div>
                    </ListItem>)}
                    {totalPatients!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMorePatientsMobile()} disabled={this.props.isLoadingRequest}  color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalPatients === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
                        <p style={{fontSize:'20px'}}>No hay pacientes registrados</p>
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
                {this.state.dialog && <DialogOpPatient
                    flagDelete={this.state.flagDelete}
                    patient={this.state.patient}
                    dialog={this.state.dialog} 
                    onClose={this.closeDialog}
                />}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPatients: Actions.getPatients,
        getPatientsMobile: Actions.getPatientsMobile,
        setPatient : Actions.setPatient,
        clearPatients : Actions.clearPatients,
    }, dispatch);
}

function mapStateToProps({ patientsReducer, fuse }) {
    return {
        patients: patientsReducer.patients.data,
        totalPatients: patientsReducer.patients.total,
        searchText: patientsReducer.patients.searchText,
        //openDialog: patientsReducer.patient.openDialog,
        actions: fuse.menulink.data,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PatientsTable)));
