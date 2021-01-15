import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles/index';
import {Card, CardContent, Typography} from '@material-ui/core';
import withReducer from 'store/withReducer';
import {FuseAnimate} from '@fuse';

import RegularResetTab from './tabs/RegularResetTab';
import * as Actions from './store/actions';
import classNames from 'classnames';

import reducer from './store/reducers';
const styles = () => ({
    root: {
        background: "url('/assets/images/backgrounds/very-blue.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    intro: {
        color: '#ffffff'
    },
    card: {
        width: '100%',
        maxWidth: 400
    }
});

class Reset extends Component {
    state = {
        tabValue: 0
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = () => {
    };

    componentWillMount(){
        const { token, userId} = this.props.match.params;
        const {confirmToken}=this.props;
        confirmToken(userId, token);
    }

    componentDidUpdate(prevProps, prevState)
    {
        // if ( this.props.login.error && (this.props.login.error.displayName || this.props.login.error.password || this.props.login.error.email) )
        // {
        //     this.form.updateInputsWithError({
        //         ...this.props.login.error
        //     });

        //     this.props.login.error = null;
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

    render()
    {
        const {classes} = this.props;
        console.log(this.props.user);
        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div
                    className={classNames(classes.intro, "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left")}>

                    <FuseAnimate animation="transition.expandIn">
                        <img style={{width:'450px'}} src="assets/images/backgrounds/logo-redlab.png" alt="logo"/>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            ¡Bienvenido!
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate delay={400}>
                        <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                            Completa tu reinicio de contraseña llenando los campos descritos
                        </Typography>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>
                    <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="md:w-full mb-32">REINICIO DE CONTRASEÑA</Typography>

                           
                            <RegularResetTab/>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <Link className="font-medium" to="/login">Volver al inicio</Link>
                            </div>

                            <div className="flex flex-col items-center">
                            </div>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        confirmToken: Actions.confirmToken,
       
      //  showMessageAction : showMessage,
    }, dispatch);
}

function mapStateToProps({ResetReducer})
{
    return {
        //Reset: auth.Reset,
       // pass    : ResetReducer.pass,
        user :  ResetReducer.user.user
    }
}


export default   withReducer('ResetReducer', reducer) (withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Reset))));
