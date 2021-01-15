import React, { Component } from 'react';
import { Button, List, ListItem, ListItemAvatar, withStyles, IconButton, Tooltip, Icon, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
import { getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/examinations/store/actions';
import ExaminationsTableHead from './ExaminationsTableHead';
import DialogOpExamination from './DialogOpExamination';
import _ from '@lodash';
import 'Utils';
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});


class ExaminationsTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: this.props.examinations,
        page: 0,
        rowsPerPage: isMobile ? 3 : 5,
        dialog: false,
        flagDelete: false,
        examination: {},
        actions: null
    };

    componentDidMount() {
        this.props.clearExaminations();
        this.handleMoreExaminations();
        this.getRoleActions();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.props.examinations, prevProps.examinations) || !_.isEqual(this.props.searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(this.props.examinations, this.props.searchText);
            this.setState({ data })
        }
    }

    componentWillUnmount(){
        this.props.clearExaminations();
        
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

    handleClickEdit = (examination) => {
        this.props.setExamination(examination)
        this.props.history.push('/apps/examinations/' + examination.id);
    }

    handleClickDelete = (examination) => {
        this.setState({examination, dialog: true, flagDelete: true})
    }
    
    handleClickShow = (examination) => {
        this.setState({examination, dialog: true, flagDelete: false})
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMoreExaminations);
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMoreExaminations);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMoreExaminations = () => {
        let {page, rowsPerPage } = this.state
        page++
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getExaminationsMobile(start, end)
        else
            this.props.getExaminations(start, end)
    }

    handleMoreExaminationsMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMoreExaminations)
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
        const { totalExaminations,isLoadingRequest } = this.props;

        return (
            <div className="w-full flex flex-col ">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ExaminationsTableHead
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
                                                {n.code}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.service.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.method !== undefined ? n.method.name : ""}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {this.renderOptions(n)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {!isLoadingRequest && totalExaminations === 0 && 
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>No hay examenes registrados</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalExaminations}
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
        const { totalExaminations, isLoadingRequest } = this.props;
        return (
            <List>
                {data.map((n,index) =>
                    <ListItem  key={index}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>poll</Icon>
                                </ListItemAvatar>
                                <p>{n.name}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>local_hospital</Icon>
                                </ListItemAvatar>
                                <p>{n.service.name}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>local_hospital</Icon>
                                </ListItemAvatar>
                                <p>{n.method !== undefined ? n.method.name : ""}</p>
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                            {this.renderOptionsMobile(n)}
                        </div>
                    </ListItem>)}
                    {totalExaminations!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMoreExaminationsMobile()} disabled={this.props.isLoadingRequest}  color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalExaminations === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
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
                {this.state.dialog && <DialogOpExamination
                    flagDelete={this.state.flagDelete}
                    examination={this.state.examination}
                    dialog={this.state.dialog} 
                    onClose={this.closeDialog}
                />}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getExaminations: Actions.getExaminations,
        getExaminationsMobile: Actions.getExaminationsMobile,
        setExamination : Actions.setExamination,
        clearExaminations : Actions.clearExaminations,
    }, dispatch);
}

function mapStateToProps({ examinationsReducer, fuse }) {
    return {
        examinations: examinationsReducer.examinations.data,
        totalExaminations: examinationsReducer.examinations.total,
        searchText: examinationsReducer.examinations.searchText,
        //openDialog: examinationsReducer.examination.openDialog,
        actions: fuse.menulink.data,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ExaminationsTable)));
