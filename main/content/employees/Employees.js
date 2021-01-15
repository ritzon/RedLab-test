import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import EmployeesTable from './EmployeesTable';
import EmployeesHeader from './EmployeesHeader';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
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

class Employees extends Component {

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
                        <EmployeesHeader history={this.props.history}/>
                    }
                    content={
                        <EmployeesTable/>
                    }
                    innerScroll
                />
                <MobileView>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={() => this.props.history.push("/apps/employees/new")}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </MobileView>
            </React.Fragment>
        )
    };
}

export default withReducer('employeesReducer', reducer)(withStyles(styles)(Employees));
