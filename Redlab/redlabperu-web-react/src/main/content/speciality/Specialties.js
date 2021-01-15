import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded, FuseAnimate} from '@fuse';
import SpecialtiesTable from './SpecialtiesTable';
import SpecialtiesHeader from './SpecialtiesHeader';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { getRoleFunctionActions } from 'Utils';
import {Fab, Icon} from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   :  0,
        bottom  :  0,
        zIndex  : 99
    }
});

class Specialties extends Component {
    
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
        const permissions = getRoleFunctionActions(navigation[0].children, actions, location.pathname, 'url');
        this.setState({actions: permissions});
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
                        <SpecialtiesHeader/>
                    }
                    content={
                        <SpecialtiesTable/>
                    }
                    innerScroll
                />
                { actions && actions.canCreate && (
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            className={classes.addButton}
                            onClick={() => this.props.history.push("/apps/specialties/new")}
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

export default withReducer('specialtiesReducer', reducer)(withStyles(styles)(connect(mapStateToProps)(Specialties)));
