import React, { Component } from 'react';
import { List, ListItem, ListItemAvatar, withStyles, Button, IconButton, Tooltip, Icon, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import { getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/agreements/store/actions';
import AgreementsTableHead from './AgreementsTableHead';
import DialogAgreement from './DialogAgreement';
import _ from '@lodash';
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});

class AgreementsTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.agreements,
        page: 0,
        user_id: localStorage.getItem('user_id'),
        rowsPerPage: isMobile ? 3 : 5,
        dialog: false,
        agreement: {},
        actions: null
    };

    componentDidMount() {
        this.handleMoreAgreements();
        this.getRoleActions();
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        const { agreements, searchText } = this.props;
        
        if (!_.isEqual(agreements, prevProps.agreements) || !_.isEqual(searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(agreements, searchText);
            this.setState({ data })
        }
    }

    componentWillUnmount(){
        this.props.clearAgreements(); 
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

    handleClickEdit = (agreement) => {
        this.props.history.push('/apps/agreements/' + agreement.id);
    }

    handleClickPriceLists = (agreement) => {
        this.props.history.push('/apps/agreements/priceLists/' + agreement.id);
    }

    handleClickDelete = (agreement) => {
        this.setState({agreement}, this.setState({dialog: true}));
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMoreAgreements);
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMoreAgreements);
    };

    closeDialog = (deleteFlag) => {
        this.setState({dialog: false});
        if (deleteFlag) {
            const {agreement, data} = this.state;
            let index = data.indexOf(agreement);
            if (index > -1)
                data.splice(index, 1)
            this.setState(data);
        }
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMoreAgreements = () => {
        let {page, rowsPerPage} = this.state
        page++
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getAgreementsMobile(start, end)
        else
            this.props.getAgreements(start, end);
    }

    handleMoreAgreementsMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMoreAgreements)
    }


    renderOptions = (item) => {
        const { actions } = this.state;
        
        return (
            <div>
                {actions && actions.canEdit && (
                 <Tooltip title="Editar">
                    <Button onClick={() => this.handleClickEdit(item)} color="primary" >
                        editar
                    </Button>
                </Tooltip>)}
                 <Tooltip title="Lista">
                    <Button onClick={() => this.handleClickPriceLists(item)} color="primary" >
                        listas de precios
                    </Button>
                </Tooltip>
            </div>
        )
    }

    renderOptionsMobile = (item) => {
        const { actions } = this.state;
        
        return (
            <div>
                {actions && actions.canEdit && (
                 <Tooltip title="Editar">
                    <IconButton onClick={() => this.handleClickEdit(item)} color="primary" >
                        <Icon>edit</Icon>
                    </IconButton>
                </Tooltip>)}
            </div>
        )
    }

    renderTableDesktop = () => {
        const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
        const { totalAgreements,isLoadingRequest } = this.props;

        return (
            <div className="w-full flex flex-col ">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <AgreementsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={6}
                        />

                        <TableBody>
                            {data.map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            className="h-64 cursor-pointer"
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
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
                                {!isLoadingRequest && totalAgreements === 0 && 
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>No hay convenios registrados</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalAgreements}
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
        const { totalAgreements, isLoadingRequest } = this.props;
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
                            {this.renderOptionsMobile(n, true)}
                        </div>
                    </ListItem>)}
                    {totalAgreements!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMoreAgreementsMobile()} disabled={this.props.isLoadingRequest}  color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalAgreements === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
                        <p style={{fontSize:'20px'}}>No hay convenios registrados</p>
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
                <DialogAgreement 
                    dialog={this.state.dialog} 
                    agreement={this.state.agreement} 
                    onClose={this.closeDialog}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAgreements: Actions.getAgreements,
        getAgreementsMobile: Actions.getAgreementsMobile,
        clearAgreements: Actions.clearAgreements
    }, dispatch);
}

function mapStateToProps({ agreementsReducer, fuse }) {
    return {
        isLoadingRequest: fuse.request.loading > 0,
        navigation: fuse.navigation,
        actions: fuse.menulink.data,
        agreements: agreementsReducer.agreements.data,
        totalAgreements: agreementsReducer.agreements.total,
        searchText: agreementsReducer.agreements.searchText
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AgreementsTable)));
