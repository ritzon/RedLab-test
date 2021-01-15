import React, { Component } from 'react';
import { Button, List, ListItem, ListItemAvatar, withStyles, IconButton, Tooltip, Icon, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import { getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/employees/store/actions';
import EmployeesTableHead from './EmployeesTableHead';
import DialogOpEmployee from './DialogOpEmployee';
import _ from '@lodash';
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});


class EmployeesTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.employees,
        page: 0,
        rowsPerPage: isMobile ? 3 : 5,
        dialog: false,
        flagDelete: false,
        employee: {},
        actions: null
    };

    componentDidMount() {
        this.props.clearEmployees();
        this.handleMoreEmployees();
        this.getRoleActions();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.employees, prevProps.employees) || !_.isEqual(this.props.searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(this.props.employees, this.props.searchText);
            this.setState({ data })
        }
    }

    componentWillUnmount(){
        this.props.clearEmployees();
        
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

    handleClickEdit = (employee) => {
        this.props.setEmployee(employee)
        this.props.history.push('/apps/employees/' + employee.person.id);
    }

    handleClickDelete = (employee) => {
        this.setState({employee, dialog: true, flagDelete: true})
    }
    
    handleClickShow = (employee) => {
        this.setState({employee, dialog: true, flagDelete: false})
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMoreEmployees);
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMoreEmployees);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMoreEmployees = () => {
        let {page, rowsPerPage } = this.state
        page++
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getEmployeesMobile(start, end)
        else
            this.props.getEmployees(start, end)
    }

    handleMoreEmployeesMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMoreEmployees)
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
        const { totalEmployees,isLoadingRequest } = this.props;

        return (
            <div className="w-full flex flex-col ">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <EmployeesTableHead
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
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.typeDoc.dni}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.person.name} {n.person.lastNameP} {n.person.lastNameM}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.typeEmployee.name}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {n.headquarter.name}
                                            </TableCell>
                                            <TableCell align="center" padding="dense" component="th" scope="row">
                                                {this.renderOptions(n)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {!isLoadingRequest && totalEmployees === 0 && 
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>No hay empleados registrados</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalEmployees}
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
        const { totalEmployees, isLoadingRequest } = this.props;
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
                                    <Icon>work</Icon>
                                </ListItemAvatar>
                                <p>{n.typeEmployee.name}</p>
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                            {this.renderOptionsMobile(n)}
                        </div>
                    </ListItem>)}
                    {totalEmployees!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMoreEmployeesMobile()} disabled={this.props.isLoadingRequest}  color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalEmployees === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
                        <p style={{fontSize:'20px'}}>No hay empleados registrados</p>
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
                {this.state.dialog && <DialogOpEmployee
                    flagDelete={this.state.flagDelete}
                    employee={this.state.employee}
                    dialog={this.state.dialog} 
                    onClose={this.closeDialog}
                />}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getEmployees: Actions.getEmployees,
        getEmployeesMobile: Actions.getEmployeesMobile,
        setEmployee : Actions.setEmployee,
        clearEmployees : Actions.clearEmployees,
    }, dispatch);
}

function mapStateToProps({ employeesReducer, fuse }) {
    return {
        employees: employeesReducer.employees.data,
        totalEmployees: employeesReducer.employees.total,
        searchText: employeesReducer.employees.searchText,
        //openDialog: employeesReducer.employee.openDialog,
        actions: fuse.menulink.data,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployeesTable)));
