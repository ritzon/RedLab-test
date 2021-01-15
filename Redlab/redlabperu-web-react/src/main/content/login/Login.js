import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles/index';
import {Card, CardContent, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';
import RegularLoginTab from './tabs/RegularLoginTab';
import {
    BrowserView,
  } from "react-device-detect";

const styles = () => ({
    root: {
        background: "url('/assets/images/backgrounds/book.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    intro: {
        color: '#ffffff'
    },
    card: {
        width: '100%',
        maxWidth: 400
    },
    textRed: {
        color: '#e53935'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0
        };
    }

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div
                    className={classNames(classes.intro, "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left")}>

                    <FuseAnimate animation="transition.expandIn">
                        <img style={{width:'450px'}} src="assets/images/backgrounds/logo-redlab.png" alt="logo"/>
                    </FuseAnimate>
                    <BrowserView>
                        <FuseAnimate animation="transition.slideUpIn" delay={300}>
                            <Typography variant="h3" color="inherit" className="font-light">
                                ¡Bienvenido!
                            </Typography>
                        </FuseAnimate>
                        <FuseAnimate delay={400}>
                            <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                                Contribuimos a la salud de las personas con información clara y confiable.
                            </Typography>
                        </FuseAnimate>
                    </BrowserView>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="text-center md:w-full mb-48">ACCEDE A TUS RESULTADOS</Typography>

                            <RegularLoginTab/>
                            
                            <div className="flex flex-col items-center justify-center pt-32">
                                <Link className="font-medium" to="/forgot" style={{color: '#e53935'}}>¿Olvido su contraseña?</Link>
                                <Link className="font-medium mt-8" to="/knowledge-base" style={{color: '#e53935'}}>Más información</Link>
                            </div>
                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Login));
