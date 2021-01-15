import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import AppointmentsTable from './AppointmentsTable';
import AppointmentsHeader from './AppointmentsHeader';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { connect } from 'react-redux';
import {Fab, Icon} from '@material-ui/core';
import { MobileView } from "react-device-detect";

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 15,
        bottom  : 15,
        zIndex  : 99
    }
});

class Appointments extends Component {

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
                        <AppointmentsHeader history={this.props.history}/>
                    }
                    content={
                        <AppointmentsTable/>
                    }
                    innerScroll
                />
                <MobileView>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={() => this.props.history.push("/apps/appointments/new")}
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
        // puts Redux state here
    }
}

export default withReducer('appointmentsReducer', reducer)(withStyles(styles)(connect(mapStateToProps)(Appointments)))
