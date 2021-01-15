import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {CircularProgress, withStyles, Button, InputAdornment, Icon} from '@material-ui/core';
import {bindActionCreators} from 'redux';
//import * as Actions from 'auth/store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions';
import withReducer from 'store/withReducer';
import reducer from '../store/reducers';


import {showMessage} from 'store/actions/fuse';
const styles = () => ({
    root: {
        width: '100%'
    }
});

class RegularRegisterTab extends Component {
    state = {
        canSubmit: false
    };

    form = React.createRef();
    


//funciones propias de fuse
    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (user) => {
        console.log(user);
        user.fullname=user.first_name+" "+user.last_name
        const {saveUser } = this.props;
        saveUser(user)
    };

    componentDidUpdate(prevProps, prevState)
    {
        // if ( this.props.register.error && (this.props.register.error.username || this.props.register.error.password || this.props.register.error.email) )
        // {
        //     this.form.updateInputsWithError({
        //         ...this.props.register.error
        //     });

        //     this.props.register.error = null;
        //     this.disableButton();
        // }

        // if ( this.props.user.role !== 'guest' )
        // {
        //     const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : '/';
        //     this.props.history.push({
        //         pathname
        //     });
        // }
        // return null;
    }
//===================================================================




    render()
    {
        const {classes, isLoadingRequest} = this.props;
        const {canSubmit} = this.state;

        return (
            <div className={classes.root}>
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="first_name"
                        label="Nombre: "
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />
                     <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="last_name"
                        label="Apellido"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="login"
                        label="Correo"
                        validations="isEmail"
                        validationErrors={{
                            isEmail: 'Por favor ingresa un correo valido'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Contraseña"
                        validations="equalsField:password-confirm"
                        validationErrors={{
                            equalsField: 'Contraseña no coincide'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password-confirm"
                        label="Confirmar Contraseña"
                        validations="equalsField:password"
                        validationErrors={{
                            equalsField: 'Contraseña no coincide'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER"
                        disabled={!canSubmit || isLoadingRequest}
                        value="legacy"
                    >
                    {isLoadingRequest && <CircularProgress size={20} color="red" />}
                        Registrarse
                    </Button>

                </Formsy>

            </div>
        );
    }
}


//====================
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        saveUser: Actions.saveUser,
       // submitRegister: Actions.submitRegister,
        showMessageAction : showMessage,
    }, dispatch);
}

function mapStateToProps({RegisterReducer, fuse})
{
    return {
        user    : RegisterReducer.user,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withReducer('RegisterReducer', reducer) (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(RegularRegisterTab))));
