import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import withReducer from 'store/withReducer';
import PatientExamsTable from './PatientExamsTable';
import PatientExamsHeader from './PatientExamsHeader';
import reducer from './store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   :  0,
        bottom  :  0,
        zIndex  : 99
    }
});

class PatientExaminations extends Component {

    render()
    {
        return (
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        content: "flex",
                        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <PatientExamsHeader />
                    }
                    content={(
                        <span>
                        <div id="myMm" style={{height: "1mm"}} />
                        <PatientExamsTable />
                        </span>   
                    )}
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

export default withReducer('patientExamsReducer', reducer)(withStyles(styles)(PatientExaminations));
