import React, { Component } from 'react';
import { List, ListItem, ListItemAvatar, withStyles, IconButton, Tooltip, Icon, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import { getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/speciality/store/actions';
import SpecialtiesTableHead from './SpecialtiesTableHead';
import DialogOpSpeciality from './DialogOpSpeciality';
import _ from '@lodash';
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});

class SpecialtiesTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.specialties,
        page: 0,
        user_id: localStorage.getItem('user_id'),
        rowsPerPage: isMobile ? 3 : 5,
        dialog: false,
        speciality: {},
        actions: null
    };

    componentDidMount() {
        this.handleMoreSpecialties();
        this.getRoleActions();
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { specialties, searchText } = this.props;

        if (!_.isEqual(specialties, prevProps.specialties) || !_.isEqual(searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(specialties, searchText);
            this.setState({ data })
        }
    }

    componentWillUnmount(){
        this.props.clearSpecialties();
    }
    
    getRoleActions() {
        const { actions, location } = this.props;
        const navigation = JSON.parse(localStorage.getItem('navigation'));
        const permissions = getRoleFunctionActions(navigation[0].children, actions, location.pathname, 'url');
        this.setState({actions: permissions});
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

    handleClickEdit = (speciality) => {
        this.props.history.push('/apps/specialties/' + speciality.id);
    }

    handleClickDelete = (speciality) => {
        this.setState({speciality}, this.setState({dialog: true}));
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMoreSpecialties);
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMoreSpecialties);
    };

    closeDialog = (deleteFlag) => {
        this.setState({dialog: false});
        if (deleteFlag) {
            const {speciality, data} = this.state;
            let index = data.indexOf(speciality);
            if (index > -1)
                data.splice(index, 1)
            this.setState(data);
        }
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMoreSpecialties = () => {
        let {page, rowsPerPage} = this.state
        page++
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getSpecialtiesMobile(start, end);
        else
            this.props.getSpecialties(start, end);
    }

    handleMoreSpecialtiesMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMoreSpecialties)
    }


    renderOptions = (item) => {
        const { actions } = this.state;

        return (
            <div>
                {actions && actions.canEdit && (
                 <Tooltip title="Editar">
                    <IconButton onClick={() => this.handleClickEdit(item)} color="primary" >
                        <Icon>edit</Icon>
                    </IconButton>
                </Tooltip>
                )}
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

    renderTableDesktop = () => {
        const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
        const { totalSpecialties, isLoadingRequest } = this.props;
        console.log(data);
        return (
            <div className="w-full flex flex-col ">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <SpecialtiesTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={6}
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
                                        //onClick={event => this.handleClick(n)}
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
                                {!isLoadingRequest && totalSpecialties === 0 &&  
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>No hay especialidades registradas</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalSpecialties}
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
        const { totalSpecialties, isLoadingRequest } = this.props;
        return (
            <List>
                {data.map((n,index) =>
                    <ListItem  key={index}>
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
                            {this.renderOptions(n, true)}
                        </div>
                    </ListItem>)}
                    {totalSpecialties!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMoreSpecialtiesMobile()} disabled={this.props.isLoadingRequest}  color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalSpecialties === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
                        <p style={{fontSize:'20px'}}>No hay especialidades registradas</p>
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
                <DialogOpSpeciality 
                    dialog={this.state.dialog} 
                    speciality={this.state.speciality} 
                    onClose={this.closeDialog}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSpecialties: Actions.getSpecialties,
        getSpecialtiesMobile: Actions.getSpecialtiesMobile,
        clearSpecialties: Actions.clearSpecialties
    }, dispatch);
}

function mapStateToProps({ specialtiesReducer, fuse }) {
    return {
        isLoadingRequest: fuse.request.loading > 0,
        navigation: fuse.navigation,
        actions: fuse.menulink.data,
        specialties: specialtiesReducer.specialties.data,
        totalSpecialties: specialtiesReducer.specialties.total,
        searchText: specialtiesReducer.specialties.searchText
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtiesTable)));
