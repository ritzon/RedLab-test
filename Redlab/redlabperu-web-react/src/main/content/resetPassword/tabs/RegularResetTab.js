import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles, Button, InputAdornment, Icon, CircularProgress} from '@material-ui/core';
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

class RegularResetTab extends Component {
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

    onSubmit = (pass) => {
        console.log(pass);
       
        const {saveNewPassword, user } = this.props;
        saveNewPassword(user.id, pass);
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
                        type="password"
                        name="password"
                        label="Nueva Contraseña"
                        validations="equalsField:password_confirm"
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
                        name="password_confirm"
                        label="Confirmar Contraseña Nueva"
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
                        aria-label="Reset"
                        disabled={!canSubmit || isLoadingRequest}
                        value="legacy"
                    >
                        {isLoadingRequest && <CircularProgress size={20} color="red" />}
                        Reiniciar Contraseña
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
        saveNewPassword: Actions.saveNewPassword,
       
        showMessageAction : showMessage,
    }, dispatch);
}

function mapStateToProps({ResetReducer,fuse})
{
    return {
        user :  ResetReducer.user.user,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withReducer('ResetReducer', reducer) (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(RegularResetTab))));
