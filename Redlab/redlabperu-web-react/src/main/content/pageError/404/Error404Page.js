import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Typography} from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {FuseAnimate} from '@fuse';

const styles = () => ({
    root: {},
    searchWrapper: {
        width: '100%',
        height: 56,
        padding: 18,
        display: 'flex',
        alignItems: 'center'
    },
    search: {
        paddingLeft: 16
    }
});

class Error404Page extends Component {

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 items-center justify-center p-16")}>

                <div className="max-w-512 text-center">

                    <FuseAnimate animation="transition.expandIn" delay={100}>
                        <Typography variant="h1" color="inherit" className="font-medium mb-16">
                            404
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate delay={500}>
                        <Typography variant="h5" color="textSecondary" className="mb-16">
                            Lo sentimos, no podemos encontrar la página que tú estás buscando
                        </Typography>
                    </FuseAnimate>

                    <Link className="font-medium" to="/logout">Iniciar sesión</Link>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Error404Page);
