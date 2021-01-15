import React, {Component} from 'react';
import {Button, TextField, Icon, Typography, Grid} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DataTables from 'material-ui-datatables';
import NumberFormat from 'react-number-format';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import { hasEmptyField } from 'Utils';
import { getPriceListApi, savePriceListApi, editPriceListApi, getExaminationsAllApi } from '../../../api';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';

const initialState = {
    name: ''
}

class PriceList extends Component {
    state = {
        tabValue: 0,
        form: null,
        examinations: []
    };

    componentDidMount() {
        const params = this.props.match.params;
        const {priceListId} = params;
        this.fetchExaminations();
        if ( priceListId === 'new' ) {
            this.setState({form: initialState});
        }
        else
            this.getPriceList(priceListId);
    }

    fetchExaminations = () => {
        const {showMessage, fetch_end, fetch_start} = this.props;
        fetch_start()
        getExaminationsAllApi().then(response => {
         if (response.status) {
            this.setState({examinations: response.data});
         }
         }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }

    getPriceList = (id) => {
        const {showMessage, fetch_end, fetch_start} = this.props;
        fetch_start()
        getPriceListApi(id).then(response => {
         if (response.status) {
            this.setState({form: response.data});
            this.updatePrices(response.data.examinations);
         }
         }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }

    savePriceList = (form) => {
        const {showMessage, fetch_end, fetch_start} = this.props;

        fetch_start()
        savePriceListApi(form).then(response => {
         if (response.status) {
            this.successMessage(response.message.text);
         } else {
            showMessage({ message: response.message.text, variant:"error" })
         }
         }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }

    editPriceList = (form, id) => {
        const {showMessage, fetch_end, fetch_start} = this.props;
        fetch_start()
        editPriceListApi(id, form).then(response => {
         if (response.status) {
            this.successMessage(response.message.text);
         } else {
            showMessage({ message: response.message.text, variant:"error" })
         }
         }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }

    successMessage = (msg) => {
        const {showMessage} = this.props;
        const params = this.props.match.params;
        showMessage({ message: msg, variant:"success" });
        this.props.history.push(`/apps/agreements/priceLists/${params.agreementId}`)
    }

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    updatePrices = (priceListExams = []) => {
        let allExaminations = this.state.examinations;
        
        // this is for update the prices getting from the price list
        // because if a new examination is created, it will not be on the price list. 
        for(let exam of priceListExams) {
            let index = allExaminations.findIndex(x => { return x.id === exam.id });
            if (index > -1)
                allExaminations[index].discountPrice = exam.discountPrice;
        }

        this.setState({examinations: allExaminations});
    }

    fillExaminationsInBlank = (examinations) => {
        for(let exam of examinations)
            if (!exam.discountPrice)
                exam.discountPrice = 0;
        return examinations;
    }

    emptyDiscountPrices = (exams) => {
        if (exams.length === 0)
            return true;
        else
            for(let exam of exams)
                if (exam.discountPrice < 0)
                    return true
        return false;
    }

    canBeSubmitted() {   
        const  { form, examinations } = this.state;
        const {isLoadingRequest} = this.props;
        return (
            !isLoadingRequest &&
            !hasEmptyField(form, ["examinations"]) &&
            examinations.length > 0
        )
    }

    submit = () => {
        const {form, examinations} = this.state;
        const {showMessage} = this.props;
        const params = this.props.match.params;
        const {priceListId, agreementId} = params;
        let filledExams = this.fillExaminationsInBlank(examinations);
        
        if (this.emptyDiscountPrices(examinations)) {
            showMessage({ message: 'No puede haber precios menores a cero', variant:'error' })
            return
        }

        if (priceListId === 'new') {
            let body = { name: form.name, examinations: filledExams, AgreementId: agreementId }
            this.savePriceList(body); 
        }
        else {
            let body = { name: form.name, examinations: filledExams }
            this.editPriceList(body, priceListId);
        }
    }

    renderTableSelected = () => {
        const TABLE_COLUMNS = [
            {
                key: "name",
                label: "Nombre"
            },
            {
                key: "discountPrice",
                label: "Precio",
                render: (discountPrice, row) => {
                    return (
                        <NumberFormat 
                            style={{ textAlign: 'right' }} 
                            thousandSeparator='.' 
                            decimalSeparator=','
                            prefix="S/. "
                            customInput={TextField}
                            value={row.discountPrice}
                            placeholder='Ingresar precio'
                            onValueChange={(val) => { row.discountPrice = parseFloat(val.value) }}
                        />
                    )
                }
            }
        ];
        
        return (
            <MuiThemeProvider>
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={this.state.examinations}
                showCheckboxes={false}
                showFooterToolbar={false}
              />
            </MuiThemeProvider>
        );
    }

    render()
    {
        const {form} = this.state;
        const params = this.props.match.params;
        const returnLink = `/apps/agreements/priceLists/${params.agreementId}`;
        
        return (
            <div>
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to={returnLink}>
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Lista de precios
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.name ? form.name : 'Registrar Lista de precios'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Detalle Lista de precio</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={this.submit}
                                >
                                    Guardar
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24">
                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        required
                                        label="Nombre de la lista"
                                        name="name"
                                        value={form.name}
                                        onChange={this.handleChange}
                                        id="name"
                                        variant="outlined"
                                        autoComplete="off"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} />
                            </Grid>
                            <div>
                                <h5>Exámenes</h5>
                                { this.renderTableSelected() }
                            </div>
                        </div>
                    )
                }
                
                innerScroll
            />
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage,
        fetch_start,
        fetch_end
    }, dispatch);
}

function mapStateToProps({fuse})
{
    return {
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);
