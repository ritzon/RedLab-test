import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles, CircularProgress, Button, InputAdornment, Icon} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from 'auth/store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import ReCAPTCHA from "react-google-recaptcha";

const styles = () => ({
    root: {
        width: '100%'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class RegularLoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            captcha: false,
            expired: false
        };
    }
    
    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        console.log(model);
        this.props.submitLogin(model);
    };

    onChange = (captcha) => {
        console.log("captcha: ", captcha);
        this.setState({captcha});
        if (captcha === null) {
            this.setState({expired: true});
        }    
    }

    componentWillMount(){
        localStorage.clear();
    }
    render()
    {
        const {classes, isLoadingRequest} = this.props;
        const {canSubmit, captcha} = this.state;

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
                        label="Email"
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
                        // validations={{
                        //     minLength: 4
                        // }}
                        // validationErrors={{
                        //     minLength: 'Al menos 4 caracteres'
                        // }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />
                    {/*<ReCAPTCHA
                        size="normal"
                        sitekey="6LetwpUUAAAAABoMjPV2uzcgis5zrXpigzNgUFA1"
                        onChange={this.onChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        disabled={!canSubmit || isLoadingRequest || !captcha}
                        value="legacy"
                    >
                    {isLoadingRequest && <CircularProgress size={20} />}
                        Ingresar
                    </Button>
                    */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        disabled={!canSubmit || isLoadingRequest }
                        value="legacy"
                    >
                    {isLoadingRequest && <CircularProgress size={20} />}
                        Ingresar
                    </Button>
                </Formsy>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLogin: Actions.submitLogin
    }, dispatch);
}

function mapStateToProps({auth, fuse})
{
    return {
        login: auth.login,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(RegularLoginTab)));
