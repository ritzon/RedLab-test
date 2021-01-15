import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded, FuseAnimate} from '@fuse';
import ReferenceValuesTable from './ReferenceValuesTable';
import ReferenceValuesHeader from './ReferenceValuesHeader';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import {Fab, Icon} from '@material-ui/core';
import { connect } from 'react-redux';
import { getRoleFunctionActions } from 'Utils';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 0,
        bottom  : 0,
        zIndex  : 99
    }
});

class ReferenceValues extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            actions: null
        }
    }

    componentDidMount() {
        this.getRoleActions();
    }
    
    getRoleActions() {
        const { actions, location } = this.props;
        const navigation = JSON.parse(localStorage.getItem('navigation'));
        if (navigation) {
            const permissions = getRoleFunctionActions(navigation[0].children, actions, location.pathname, 'url');
            this.setState({actions: permissions});
        }
    }

    render()
    {
        const { classes } = this.props;
        const { actions } = this.state;
        return (
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        content: "flex",
                        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <ReferenceValuesHeader/>
                    }
                    content={
                        <ReferenceValuesTable/>
                    }
                    innerScroll
                />
                { actions && actions.canCreate && (
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            className={classes.addButton}
                            onClick={() => this.props.history.push("/apps/referenceValues/new")}
                        >
                            <Icon>add</Icon>
                        </Fab>
                    </FuseAnimate>
                )}
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

export default withReducer('referenceValuesReducer', reducer)(withStyles(styles)(connect(mapStateToProps)(ReferenceValues)))
