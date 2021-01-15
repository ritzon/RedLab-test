import React, { Component } from 'react';
import { List, ListItem, ListItemAvatar, withStyles, IconButton, Tooltip, Icon, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/services/store/actions';
import ServicesTableHead from './ServicesTableHead';
import _ from '@lodash';
import { getRoleFunctionActions } from 'Utils';
import DialogService from './DialogService';

import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});


class ServicesTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.services,
        page: 0,
        rowsPerPage: isMobile ? 3 : 5,
        user_id: localStorage.getItem('user_id'),
        dialog: false,
        service: {},
        actions: null
    };

    componentDidMount() {
        this.handleMoreServices();
        this.getRoleActions();
    }

    componentWillUnmount(){
        this.props.clearServices()
    }

    componentDidUpdate(prevProps, prevState) {
        const { services, searchText } = this.props;

        if (!_.isEqual(services, prevProps.services) || !_.isEqual(searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(services, searchText);
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

    handleEditService = (item) => {
         this.props.history.push('/apps/services/' + item.id);
    };
    
    handleDeleteService = (service) => {
        this.setState({service}, this.setState({dialog: true}));
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMoreServices);
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMoreServices);
    };

    closeDialog = (deleteFlag) => {
        this.setState({dialog: false});
        if (deleteFlag) {
            const {service, data} = this.state;
            let index = data.indexOf(service);
            if (index > -1)
                data.splice(index, 1)
            this.setState(data);
        }
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMoreServices = () => {
        let {page, rowsPerPage} = this.state
        page++;
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getServicesMobile(start, end);
        else
            this.props.getServices(start, end);
    }

    handleMoreServicesMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMoreServices)
    }

    renderOptions = (item) => {
        const { actions } = this.state;

        return (
            <div style={{display:'flex'}}>
                {actions && actions.canEdit && (
                <Tooltip title="Editar">
                    <IconButton   onClick={() => this.handleEditService(item)} color="primary"  >
                        <Icon>edit</Icon>
                    </IconButton>
                </Tooltip>
                )}
                {actions && actions.canDelete && (
                <Tooltip title="Eliminar">
                    <IconButton  onClick={() => this.handleDeleteService(item)} color="primary"  >
                        <Icon>delete</Icon>
                    </IconButton>
                </Tooltip>
                )}
            </div>
        )
    }

    renderTableDesktop = () => {
        const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
        const { totalServices, isLoadingRequest } = this.props;
        
        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ServicesTableHead
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
                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.description}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {this.renderOptions(n)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {!isLoadingRequest && totalServices === 0 && 
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>No hay servicios registrados</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalServices}
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
        const { totalServices, isLoadingRequest } = this.props;
        
        return (
            <List>
                {data.map((n,i) =>
                    <ListItem key={i} style={{paddingBottom:'0px'}}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>title</Icon>
                                </ListItemAvatar>
                                <p>{n.name}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>subject</Icon>
                                </ListItemAvatar>
                                <p>{n.description}</p>
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                            {this.renderOptions(n)}
                        </div>
                    </ListItem>)}
                    {totalServices!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMoreServicesMobile()} disabled={this.props.isLoadingRequest} color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalServices === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
                        <p style={{fontSize:'20px'}}>No hay recargas registradas</p>
                    </ListItem>}
                    
            </List>
        )
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                {/* <div className="hidden sm:flex">
                    {this.renderTableDesktop()}
                </div>
                <div className="sm:hidden">
                    {this.renderListMobile()}
                </div> */}
                <BrowserView>
                    {this.renderTableDesktop()}
                </BrowserView>                        
                <MobileView> 
                    {this.renderListMobile()}
                </MobileView> 
                <DialogService 
                    dialog={this.state.dialog} 
                    service={this.state.service} 
                    onClose={this.closeDialog}
                />
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getServices: Actions.getServices,
        getServicesMobile: Actions.getServicesMobile,
        clearServices: Actions.clearServices
    }, dispatch);
}

function mapStateToProps({ servicesReducer, fuse }) {
    return {
        services: servicesReducer.services.data,
        totalServices: servicesReducer.services.total,
        searchText: servicesReducer.services.searchText,
        openDialog: servicesReducer.service.openDialog,
        navigation: fuse.navigation,
        actions: fuse.menulink.data,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ServicesTable)));
