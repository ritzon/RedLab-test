import React, {Component} from 'react';
import {withStyles, Button, TextField, Icon, Typography, MenuItem} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { cutString, getRoleFunctionActions, hasEmptyField } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { getTypeAgreementsAllApi } from '../../../api';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';

const styles = theme => ({
    cardImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    cardImageItem        : {
        width                   : 128,
        height                  : 128,
        display                 : 'flex',
        alignItems              : 'center',
        justifyItems            : 'center',
        position                : 'relative',
        borderRadius            : 4,
        marginRight             : 16,
        marginBottom            : 16,
        overflow                : 'hidden',
        boxShadow               : theme.shadows[0],
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        cursor                  : 'pointer',
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $cardImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $cardImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $cardImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class Agreement extends Component {
    state = {
        tabValue: 0,
        form    : null,
        typeAgreements: []
    };
    
    componentDidMount()
    {
        const params = this.props.match.params;
        const {agreementId} = params;
        if ( agreementId === 'new') {   
            this.props.newAgreement();

            if(!this.canCreate())
                this.redirectToHome();
        }
        else
        {   
            this.props.getAgreement(agreementId);
        }
        this.fetchTypeAgreements();
    }
    
    
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( this.props.agreement && !this.state.form && !this.props.isLoadingRequest )
        {
            this.setState({form: this.props.agreement})
        }
        
    }
    
    fetchTypeAgreements = () => {
        const {showMessage, fetch_end, fetch_start} = this.props
        fetch_start()
        getTypeAgreementsAllApi().then(response => {
            if (response.status)
              this.setState({typeAgreements: response.data})
        }, err => {
            console.log(err)
            showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
        }).finally(fetch_end)
    }

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    }

    redirectToHome = () => {
        this.props.history.push({pathname: '/apps/home'});
    }

    canCreate() {
        const {actions, location} = this.props;
        const navigation = JSON.parse(localStorage.getItem('navigation'));
        const path = cutString(location.pathname, 4);
        const permissions = getRoleFunctionActions(navigation[0].children, actions, path, 'url');
        
        return permissions.canCreate;
    }

    canBeSubmitted()
    {   
        const  { form } = this.state;
        const {isLoadingRequest} = this.props;
        return (
            !isLoadingRequest &&
            !hasEmptyField(form, ["ruc", "pricesList"]) &&
            !_.isEqual(this.props.agreement, this.state.form)
        )
    }

    submit = () => {
        const {form} = this.state;
        const params = this.props.match.params;
        const {agreementId} = params;
        
        if (agreementId === 'new') 
            this.props.saveAgreement(form); 
        else
            this.props.editAgreement(form, agreementId);
    }

    render()
    {
        const {form, typeAgreements} = this.state;

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
                                        <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/agreements">
                                            <Icon className="mr-4 text-20">arrow_back</Icon>
                                            Convenios
                                        </Typography>
                                    </FuseAnimate>

                                    <div className="flex items-center max-w-full">
                                        <div className="flex flex-col min-w-0">
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography className="text-16 sm:text-20 truncate">
                                                    {form.name ? form.name : 'Registrar convenio'}
                                                </Typography>
                                            </FuseAnimate>
                                        </div>
                                    </div>
                                </div>
                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Button
                                        className="whitespace-no-wrap"
                                        variant="contained"
                                        disabled={!this.canBeSubmitted()}
                                        onClick={() => this.submit()}
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
                                <div style={{display:"flex", justifyContent:"center"}}>
                                    <TextField
                                      id="standard-select-currency"
                                      className="mt-8 mb-16 mr-8 ml-8"
                                      select
                                      required
                                      label="Tipo"
                                      value={form.TypeAgreementId}
                                      name="TypeAgreementId"
                                      onChange={this.handleChange}
                                      helperText="Por favor seleccione uno"
                                      margin="normal"
                                      variant="outlined"
                                    >
                                      {typeAgreements.map((option, index) => (
                                        <MenuItem key={index} value={option.id}>
                                          {option.name}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        autoComplete="off"
                                        estyle={{display:"flex", justifyContent:"center"}}
                                        error={form.name === ''}
                                        required
                                        label="Nombre"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div style={{display:"flex", justifyContent:"center"}}>
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        autoComplete="off"
                                        error={form.tlfNumber === ''}
                                        required
                                        label="Telefono"
                                        id="tlfNumber"
                                        name="tlfNumber"
                                        value={form.tlfNumber}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        autoComplete="off"
                                        error={form.address === ''}
                                        required
                                        label="Direccion"
                                        id="address"
                                        name="address"
                                        value={form.address}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div style={{display:"flex", justifyContent:"center"}}>
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        autoComplete="off"
                                        error={form.ruc === ''}
                                        required
                                        label="RUC"
                                        id="ruc"
                                        name="ruc"
                                        value={form.ruc}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        autoComplete="off"
                                        error={form.email === ''}
                                        required
                                        type="email"
                                        label="Correo"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <TextField
                                        autoComplete="off"
                                        multiline={true}
                                        error={form.description === ''}
                                        required
                                        label="Descripción"
                                        id="description"
                                        name="description"
                                        value={form.description}
                                        onChange={this.handleChange}
                                        rows={2}
                                        variant="outlined"
                                        fullWidth
                                    />
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
        fetch_end,
        getAgreement: Actions.getAgreement,
        newAgreement: Actions.newAgreement,
        saveAgreement: Actions.saveAgreement,
        editAgreement: Actions.editAgreement
    }, dispatch);
}

function mapStateToProps({agreementsReducer, fuse})
{
    return {
        isLoadingRequest: fuse.request.loading > 0,
        actions: fuse.menulink.data,
        navigation: fuse.navigation,
        agreement: agreementsReducer.agreement.data,
        agreements: agreementsReducer.agreements.data,
        openDialog: agreementsReducer.agreement.openDialog,
    }
}

export default withReducer('agreementsReducer', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Agreement))));