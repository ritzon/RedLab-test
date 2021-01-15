import React, { Component } from 'react';
import { List, ListItem, ListItemAvatar, withStyles, Button, IconButton, Tooltip, Icon, Table, TableBody, TableCell, TablePagination, TableRow } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { FuseScrollbars } from '@fuse';
import { bindActionCreators } from 'redux';
//import { getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/patientExamination/store/actions';
import PatientExamsTableHead from './PatientExamsTableHead';
import DialogPatientExams from './DialogPatientExams';
import DialogPrintExams from './DialogPrintExams';
import 'Utils';
import _ from '@lodash';
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect";

const styles = () => ({
    root: {}
});

class PatientExamsTable extends Component {
    state = {
        order: 'asc',
        orderBy: null,
        selected: [],
        data: [],
        page: 0,
        user_id: localStorage.getItem('user_id'),
        rowsPerPage: isMobile ? 3 : 5,
        dialog: false,
        print: false,
        appointment: {},
        actions: null
    };

    componentDidMount() {
        this.handleMoreExams();
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { patientExaminations, searchText } = this.props;
        
        if (!_.isEqual(patientExaminations, prevProps.patientExaminations) || !_.isEqual(searchText, prevProps.searchText)) {
            const data = this.getFilteredArray(patientExaminations, searchText);
            this.setState({ data })
        }
    }

    componentWillUnmount(){
        this.props.clearPatientExams(); 
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

    handleClickEdit = (exam) => {
        this.props.history.push('/apps/patientexaminations/' + exam.id);
    }

    handleClickDelete = (exam) => {
        this.setState({exam}, this.setState({dialog: true}));
    }

    handleClickShow = (appointment) => {
        this.setState({appointment, dialog: true});
    }

    handleClickPrint = (appointment) => {
        this.setState({appointment, print: true});
    }

    handleChangePage = (event, page) => {
        this.setState({ page },this.handleMoreExams);
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },this.handleMoreExams);
    };

    closeDialog = () => {
        this.setState({dialog: false});
    }

    closePrint = () => {
        this.setState({print: false});
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleMoreExams = () => {
        let {page, rowsPerPage, user_id} = this.state;
        page++
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage - 1;
        console.log("page",page,"start",start,"end",end)
        if(isMobile)
            this.props.getPatientExamsMobile(start, end, user_id)
        else
            this.props.getPatientExams(start, end, user_id);
    }

    handleMoreAgreementsMobile = () => {
        this.setState({
            page : this.state.page + 1,
        },this.handleMoreAgreements)
    }


    renderOptions = (item) => {
        return (
            <div>
                {/*
                 <Tooltip title="Visualizar">
                    <Button onClick={() => this.handleClickShow(item)} color="primary" >
                        Ver
                    </Button>
                </Tooltip>
                */}
                {item && item.status === "E" && (
                    <Tooltip title="Ver resultados">
                        <Button onClick={() => this.handleClickPrint(item)} color="primary" >
                            Ver resultados
                        </Button>
                    </Tooltip>
                )}
            </div>
        )
    }

    renderOptionsMobile = (item) => {
        return (
            <div>
                {/*
                 <Tooltip title="Visualizar">
                    <IconButton onClick={() => this.handleClickShow(item)} color="primary" >
                        <Icon>visibility</Icon>
                    </IconButton>
                </Tooltip>
                */}
                {item && item.status === "E" && (
                    <Tooltip title="Imprimir">
                        <IconButton onClick={() => this.handleClickPrint(item)} color="primary" >
                            <Icon>print</Icon>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        )
    }

    renderTableDesktop = () => {
        const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
        const { totalPatientExaminations, isLoadingRequest } = this.props;

        return (
            <div className="w-full flex flex-col ">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">
                        
                        <PatientExamsTableHead
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
                                                {n.dateAppointmentEU}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.time12h}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.headquarter.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <p style={{color: `${n.colorStatus.primary}`}}>
                                                    {n.statusStr}
                                                </p>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {this.renderOptions(n)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {!isLoadingRequest && totalPatientExaminations === 0 && 
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <p style={{fontSize:'20px', textAlign:'center'}}>Citas no encontradas</p>
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </FuseScrollbars>
                <TablePagination
                    component="div"
                    count={totalPatientExaminations}
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
        const { totalPatientExaminations = 0, isLoadingRequest } = this.props;
        return (
            <List>
                {data.map((n,index) =>
                    <ListItem  key={index}>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>calendar_today</Icon>
                                </ListItemAvatar>
                                <p>{n.dateAppointmentEU} {n.time12h}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>local_hospital</Icon>
                                </ListItemAvatar>
                                <p>{n.headquarter.name}</p>
                            </div>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <ListItemAvatar>
                                    <Icon>info</Icon>
                                </ListItemAvatar>
                                <p style={{color: `${n.colorStatus.primary}`}}>
                                    {n.statusStr}
                                </p>
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                            {this.renderOptionsMobile(n, true)}
                        </div>
                    </ListItem>)}
                    {totalPatientExaminations!==data.length && (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton onClick={() => this.handleMoreAgreementsMobile()} disabled={this.props.isLoadingRequest}  color="primary" >
                                <Icon style={{fontSize:'40px'}}>expand_more</Icon>
                            </IconButton>
                        </div>
                    )}
                    {!isLoadingRequest && totalPatientExaminations === 0 && <ListItem style={{paddingTop:'25px', display:'flex', justifyContent:'center'}}>
                        <p style={{fontSize:'20px'}}>No hay examenes registrados</p>
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
                {this.state.dialog && (
                    <DialogPatientExams
                        appointment={this.state.appointment}
                        dialog={this.state.dialog} 
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
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPatientExams: Actions.getPatientExams,
        getPatientExamsMobile: Actions.getPatientExamsMobile,
        clearPatientExams: Actions.clearPatientExams
    }, dispatch);
}

function mapStateToProps({ patientExamsReducer, fuse }) {
    return {
        patientExaminations: patientExamsReducer.patientExams.data,
        totalPatientExaminations: patientExamsReducer.patientExams.total,
        searchText: patientExamsReducer.patientExams.searchText,
        isLoadingRequest: fuse.request.loading > 0,
        navigation: fuse.navigation,
        actions: fuse.menulink.data
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(PatientExamsTable)));
