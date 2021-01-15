import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InputLabel, OutlinedInput, FormControl, withStyles, Button, Typography, FormHelperText } from '@material-ui/core';
import { FuseAnimate, FusePageCarded, FusePageSimple } from '@fuse';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions/editUser.actions';
import _ from '@lodash';


const styles = theme => ({
    layoutRoot   : {},
    layoutToolbar: {
        padding: 0
    },
    layoutHeader : {
        height                        : 320,
        minHeight                     : 320,
        background                    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize                : 'cover',
        color                         : '#fff',
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    },
    formControl:{
        marginTop: '10px'
    }
});

class ChangePasswordPage extends Component {
    state = {
        tabValue: 0,
        form: {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        },
    };

    handleChange = (event) => {
        this.setState({ form: _.set({ ...this.state.form }, event.target.name, event.target.value) });
    };

    submit = () => {
        const user_id = localStorage.getItem('user_id')
        const form = this.state.form;
        this.props.changePassword(user_id, form);
        this.setState({
            form: {
                currentPassword: "",
                newPassword: "",
                newPasswordConfirm: "",
            }
        })
      
    }
    
    canBeSubmitted()
    {
        const {isLoadingRequest} = this.props
        const {form} = this.state
        return (
            !isLoadingRequest &&
            form.currentPassword.length &&
            form.newPassword.length &&
            form.newPasswordConfirm.length &&
            !this.errorDiferentNewPasswords()
        );
    }

    errorDiferentNewPasswords = () => this.state.form.newPassword !== "" && this.state.form.newPasswordConfirm !== "" && this.state.form.newPassword !== this.state.form.newPasswordConfirm

    labelErrorDiferentNewPasswords = () => "Contraseñas no coinciden"

    render()
    {
        const {classes} = this.props;
        const { form } = this.state;

        return (
            <FusePageSimple
                classes={{
                    root   : classes.layoutRoot,
                    header : classes.layoutHeader,
                    toolbar: classes.layoutToolbar
                }}
                content={
                    <FusePageCarded
                    classes={{
                        toolbar: "p-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header= {form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full"/>
                            
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
                    content={form && (

                        <div className="p-16 sm:p-24">
                            <div>
                                <FormControl className={classes.formControl} error={form.currentPassword === ''} fullWidth aria-describedby="component-error-text" variant="outlined">
                                    <InputLabel 
                                        htmlFor="currentPassword" 
                                        ref={ref => {
                                        this.labelRef1 = ReactDOM.findDOMNode(ref);
                                        }}>
                                        Contraseña actual
                                    </InputLabel>
                                    <OutlinedInput 
                                        type="password" 
                                        id="currentPassword" 
                                        name="currentPassword" 
                                        value={form.currentPassword} 
                                        onChange={this.handleChange} 
                                        labelWidth={this.labelRef1 ? this.labelRef1.offsetWidth : 0}
                                    />
                                </FormControl>
                                <FormControl className={classes.formControl} error={form.newPassword === '' || this.errorDiferentNewPasswords()} fullWidth aria-describedby="component-error-text" variant="outlined">
                                    <InputLabel 
                                        htmlFor="newPassword" 
                                        ref={ref => {
                                        this.labelRef2 = ReactDOM.findDOMNode(ref);
                                        }}>
                                        Nueva contraseña
                                    </InputLabel>
                                    <OutlinedInput 
                                        type="password" 
                                        id="newPassword" 
                                        name="newPassword" 
                                        value={form.newPassword} 
                                        onChange={this.handleChange} 
                                        labelWidth={this.labelRef2 ? this.labelRef2.offsetWidth : 0}
                                    />
                                    <FormHelperText id="component-error-text">
                                        {this.errorDiferentNewPasswords() && this.labelErrorDiferentNewPasswords()}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl className={classes.formControl} error={form.newPasswordConfirm === '' || this.errorDiferentNewPasswords()} fullWidth aria-describedby="component-error-text" variant="outlined">
                                    <InputLabel 
                                        htmlFor="newPasswordConfirm" 
                                        ref={ref => {
                                        this.labelRef3 = ReactDOM.findDOMNode(ref);
                                        }}>
                                        Confirmar nueva contraseña
                                    </InputLabel>
                                    <OutlinedInput 
                                        type="password" 
                                        id="newPasswordConfirm" 
                                        name="newPasswordConfirm" 
                                        value={form.newPasswordConfirm} 
                                        onChange={this.handleChange} 
                                        labelWidth={this.labelRef3 ? this.labelRef3.offsetWidth : 0}
                                    />
                                    <FormHelperText id="component-error-text">
                                        {this.errorDiferentNewPasswords() && this.labelErrorDiferentNewPasswords()}
                                    </FormHelperText>
                                </FormControl>
                                <Typography variant="subtitle1" style={{color: '#546E7A'}} className="max-w-512 mt-16">
                                    *La contraseña debe tener entre 4 y 8 caracteres.
                                </Typography>
                            </div>
                        </div>
                    )}
                    innerScroll
                />
                }
            />
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePassword: Actions.changePassword,
    }, dispatch);

}

function mapStateToProps({ fuse }) {
    return {
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ChangePasswordPage));
