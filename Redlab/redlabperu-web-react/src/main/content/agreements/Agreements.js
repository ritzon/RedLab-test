import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import { Fab, Icon } from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import AgreementsTable from './AgreementsTable';
import AgreementsHeader from './AgreementsHeader';
import withReducer from 'store/withReducer';
// import { getRoleFunctionActions } from 'Utils';
import reducer from './store/reducers';
import { connect } from 'react-redux';
import { MobileView } from "react-device-detect";

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   :  15,
        bottom  :  15,
        zIndex  : 99
    }
});

class Agreements extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            actions: null
        }
    }

    componentDidMount() {
        /*
        for check the role functions
        this.getRoleActions();
        */
    }

    /*
    getRoleActions() {
        const { actions, location } = this.props;
        const navigation = JSON.parse(localStorage.getItem('navigation'));
        const permissions = getRoleFunctionActions(navigation[0].children, actions, location.pathname, 'url');
        this.setState({actions: permissions});
    }
    */

    render()
    {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        content: "flex",
                        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <AgreementsHeader history={this.props.history}/>
                    }
                    content={
                        <AgreementsTable/>
                    }
                    innerScroll
                />
                <MobileView >
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={() => this.props.history.push("/apps/agreements/new")}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </MobileView>
            </React.Fragment>
        )
    };
}

function mapStateToProps({ fuse }) {
    return {
        actions: fuse.menulink.data,
        navigation: fuse.navigation
    }
}

export default withReducer('agreementsReducer', reducer)(withStyles(styles)(connect(mapStateToProps)(Agreements)))
