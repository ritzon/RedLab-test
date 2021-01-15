import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Profile from './Profile';

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
    tabsRoot     : {
        height: 64,
        width : '100%'
    },
    tabRoot      : {
        height: 64
    }
});

class ProfilePage extends Component {

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render()
    {
        const {classes} = this.props;

        return (
            <FusePageSimple
                classes={{
                    root   : classes.layoutRoot,
                    header : classes.layoutHeader,
                    toolbar: classes.layoutToolbar
                }}
                content={
                    <Profile/>
                }
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(ProfilePage);
