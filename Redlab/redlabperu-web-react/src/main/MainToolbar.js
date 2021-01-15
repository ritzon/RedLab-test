import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from 'classnames';
import {CircularProgress, Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import * as authActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import {FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root     : {
        display   : 'flex',
        alignItems: 'center',
        width     : '100%'
    },
    seperator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    }
});

class MainToolbar extends Component {
    state = {
        userMenu: null
    };

    userMenuClick = event => {
        this.setState({userMenu: event.currentTarget});
    };

    userMenuClose = () => {
        this.setState({userMenu: null});
    };

    headquarters = () => {
        return (
            <MenuItem component={Link} to="/apps/headquarters" onClick={this.userMenuClose}>
                <ListItemIcon>
                    <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Administrar sedes"/>
            </MenuItem>
        )
    }

    render()
    {
        const {classes, user, logout, isLoadingRequest} = this.props;
        const {userMenu} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-row")}>
                
            <div className="flex flex-1 justify-center">
                {isLoadingRequest && <CircularProgress color="secondary"/>}
            </div>
            
                <div className="flex">
                    <FuseAnimate delay={300}>
                        <Button className="h-64" onClick={this.userMenuClick}>
                            {user.data.photoURL ?
                                (
                                    <Avatar className="" alt="user photo" src={user.data.photoURL}/>
                                )
                                :
                                (
                                    <Avatar className="">
                                        {user.data.person.displayName[0]}
                                    </Avatar>
                                )
                            }

                            <div className="hidden md:flex flex-col ml-12 items-start">
                                <Typography component="span" className="normal-case font-600 flex">
                                    {user.data.person.displayName}
                                </Typography>
                            </div>

                            <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
                        </Button>
                    </FuseAnimate>

                    <Popover
                        open={Boolean(userMenu)}
                        anchorEl={userMenu}
                        onClose={this.userMenuClose}
                        anchorOrigin={{
                            vertical  : 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical  : 'top',
                            horizontal: 'center'
                        }}
                        classes={{
                            paper: "py-8"
                        }}
                    >
                            <React.Fragment>
                                <MenuItem component={Link} to="/pages/profile" onClick={this.userMenuClose}>
                                    <ListItemIcon>
                                        <Icon>account_circle</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="Mi Perfil"/>
                                </MenuItem>
                                {user.data.roles && user.data.roles[0].id === 1 && this.headquarters()}
                                <MenuItem component={Link} to="/pages/changePassword" onClick={this.userMenuClose}>
                                    <ListItemIcon>
                                        <Icon>vpn_key</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="Cambiar contraseña"/>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        logout();
                                        this.userMenuClose();
                                    }}
                                    component={Link} to="/logout" >
                                    <ListItemIcon>
                                        <Icon>exit_to_app</Icon>
                                    </ListItemIcon>
                                    <ListItemText className="pl-0" primary="Cerrar sesión"/>
                                </MenuItem>
                            </React.Fragment>
                    </Popover>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        logout          : authActions.logoutUser,
        submitLogin     : authActions.submitLogin
    }, dispatch);
}


function mapStateToProps({auth, fuse})
{
    return {
        user: auth.user,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(MainToolbar));
