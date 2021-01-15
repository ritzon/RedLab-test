import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as authActions from 'auth/store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

let redirect = false;

class FuseAuthorization extends Component {

    constructor(props)
    {
        super(props);
        this.checkAuth();
    }

    componentDidUpdate(prevProps)
    {
        /**
         * If route is changed
         * Update auths
         */
        if ( !_.isEqual(this.props.location.pathname, prevProps.location.pathname) )
        {
            this.checkAuth();
        }
    }

    checkAuth()
    {   
        if(this.props.user.role === 'guest' && localStorage.credentials) {
            const {email, password} = JSON.parse(localStorage.credentials)

            console.log("checkAuth1",this.props.location.pathname);
            this.props.submitLoginAutomatic({email,password},this.props.location.pathname)
            .then(() => {
                this.checkRoutesMatch();
            });
            return;
        }

        this.checkRoutesMatch();
    }
    
    checkRoutesMatch() {
        const matched = matchRoutes(this.props.routes, this.props.location.pathname)[0];
        
        if ( matched && matched.route.auth && matched.route.auth.length > 0 )
        {
            if ( !matched.route.auth.includes(this.props.user.role) )
            {
                redirect = true;
                if ( this.props.user.role === 'guest' )
                {
                    console.log("lo redirecciono")
                    this.props.history.push({
                        pathname: '/login',
                        state   : {redirectUrl: this.props.location.pathname}
                    });
                }
                else
                {
                    this.props.history.push({
                        pathname: '/'
                    });
                }
            }
        }
    }

    shouldComponentUpdate(nextProps)
    {
        if ( redirect )
        {
            redirect = false;
            return false;
        }
        else
        {
            return true;
        }
    }

    render()
    {
        const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLoginAutomatic     : authActions.submitLoginAutomatic
    }, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        user: auth.user,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseAuthorization));
