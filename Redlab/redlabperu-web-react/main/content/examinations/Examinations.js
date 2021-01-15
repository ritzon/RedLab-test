import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import ExaminationsTable from './ExaminationsTable';
import ExaminationsHeader from './ExaminationsHeader';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { MobileView } from "react-device-detect";
import {Fab, Icon} from '@material-ui/core';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   :  15,
        bottom  :  15,
        zIndex  : 99
    }
});

class Examinations extends Component {

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
                        <ExaminationsHeader history={this.props.history}/>
                    }
                    content={
                        <ExaminationsTable/>
                    }
                    innerScroll
                />
                <MobileView>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={() => this.props.history.push("/apps/examinations/new")}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </MobileView>
            </React.Fragment>
        )
    };
}

export default withReducer('examinationsReducer', reducer)(withStyles(styles)(Examinations));
