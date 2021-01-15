import React, { Component } from 'react';
import { withStyles, Icon, Typography  } from '@material-ui/core';
import { FuseAnimate, FusePageCarded, FusePageSimple } from '@fuse';
import { connect } from 'react-redux';
import classNames from 'classnames';
import HomeContent from './HomeContent';
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

class Home extends Component {


    render()
    {
        const {classes, user} = this.props;

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
                    header= {(
                        <div className={classNames(classes.root, "flex flex-1 w-full items-center justify-between")}>

                            <div className="flex items-center"/>
            
                            <div className="flex flex-1 items-center justify-center px-12">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Icon className="text-32 mr-0 sm:mr-12">home</Icon>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="" variant="h6">
                                        {!_.isEmpty(user.person.headquarter,true) ? user.person.headquarter.name : 'Laboratorio clínico'}
                                    </Typography>
                                </FuseAnimate>
                            </div>
                        </div>
                    )}
                    content={
                        <HomeContent />
                    }
                    innerScroll
                />
                }
            />
        )
    };
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user.data
    }
}

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Home));
