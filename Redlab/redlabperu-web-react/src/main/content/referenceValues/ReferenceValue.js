import React, {Component} from 'react';
import {Button, TextField, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { cutString, getRoleFunctionActions, hasEmptyField } from 'Utils';

class ReferenceValue extends Component {
    state = {
        tabValue: 0,
        form: null,
        open: false
    };

    componentDidMount() {
        const params = this.props.match.params;
        const {referenceValueId} = params;
        if ( referenceValueId === 'new' ) {
            this.props.newReferenceValue();

            if(!this.canCreate())
                this.redirectToHome();
        }
        else
            this.props.getReferenceValue(referenceValueId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.referenceValue && !this.state.form && !this.props.isLoadingRequest ) {
            this.setState({form: this.props.referenceValue})
        }
    }

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

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

    canBeSubmitted() {   
        const {isLoadingRequest} = this.props;
        return (
            !isLoadingRequest &&
            !hasEmptyField(this.state.form) &&
            !_.isEqual(this.props.referenceValue, this.state.form)
        )
    }

    submit = () => {
        const {form} = this.state;
        const params = this.props.match.params;
        const {referenceValueId} = params;
        
        if (referenceValueId === 'new')
            this.props.saveReferenceValue(form); 
        else
            this.props.editReferenceValue(form, referenceValueId);
    }

    render()
    {
        const {form} = this.state;
        
        return (
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/referenceValues">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Servicios
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.name ? form.name : 'Registrar Valor de referencia'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Detalle del valor de referencia</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            {form.typeView!=="show" && (
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
                            )}
                            
                        </div>
                    )
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24">
                                <div>
                                <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Nombre"
                                    name="name"
                                    value={form.name}
                                    onChange={this.handleChange}
                                    id="name"
                                    variant="outlined"
                                    fullWidth
                                />
                                </div>
                                <div>
                                <TextField
                                    className="mt-8 mb-16"
                                    required
                                    label="Unidad"
                                    name="unit"
                                    value={form.unit}
                                    onChange={this.handleChange}
                                    id="unit"
                                    variant="outlined"
                                    fullWidth
                                />
                                </div>
                        </div>
                    )
                }
                
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getReferenceValue : Actions.getReferenceValue,
        newReferenceValue : Actions.newReferenceValue,
        saveReferenceValue: Actions.saveReferenceValue,
        editReferenceValue: Actions.editReferenceValue
    }, dispatch);
}

function mapStateToProps({referenceValuesReducer, fuse})
{
    return {
        referenceValue: referenceValuesReducer.referenceValue.data,
        referenceValues: referenceValuesReducer.referenceValues.data,
        actions: fuse.menulink.data,
        navigation: fuse.navigation,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withReducer('referenceValuesReducer', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReferenceValue)));
