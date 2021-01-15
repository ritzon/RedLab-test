import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles, Button, InputAdornment, Icon, CircularProgress} from '@material-ui/core';
import {bindActionCreators} from 'redux';
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

class RegularForgotTab extends Component {
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

    onSubmit = (email) => {
        console.log(email);
     
        const {recoverPassword } = this.props;
    
        recoverPassword(email)
          
    };

    componentDidUpdate(prevProps, prevState)
    {
      
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
                        name="email"
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

                 
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="Recuperar Contraseña"
                        disabled={!canSubmit || isLoadingRequest}
                        value="legacy"
                    >
                        {isLoadingRequest && <CircularProgress size={20} color="red" />}
                        Recuperar Contraseña
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
        recoverPassword: Actions.recoverPassword,
       // submitForgot: Actions.submitForgot,
        showMessageAction : showMessage,
    }, dispatch);
}

function mapStateToProps({ForgotReducer, fuse})
{
    return {
        //Forgot: auth.Forgot,
        email    : ForgotReducer.email,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withReducer('ForgotReducer', reducer) (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(RegularForgotTab))));
