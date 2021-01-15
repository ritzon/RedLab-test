import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Tab, Tabs} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import AppointmentsTable from '../appointments/AppointmentsTable';
import AppointmentsHeader from '../appointments/AppointmentsHeader';
import withReducer from 'store/withReducer';
import reducer from '../appointments/store/reducers';
import { connect } from 'react-redux';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 15,
        bottom  : 15,
        zIndex  : 99
    }
});

const appointmentStatus = ['S', 'E']

class Results extends Component {
    
    state = {
        tabValue: 0
    }
    
    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    render()
    {
        const { tabValue } = this.state;
        return (
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        content: "flex",
                        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <AppointmentsHeader
                            showResults
                            appointmentStatus={appointmentStatus[tabValue]}
                        />
                    }
                    content={
                        <div style={{width:'100%'}}>
                            <Tabs
                              value={tabValue}
                              onChange={this.handleChangeTab}
                              indicatorColor="primary"
                              textColor="primary"
                              centered
                              variant="fullWidth"
                              classes={{root: "w-full h-64"}}
                            >
                              <Tab className="h-64 normal-case" label="POR ATENDER" />
                              <Tab className="h-64 normal-case" label="ATENDIDAS" />
                            </Tabs>
                            <AppointmentsTable 
                                showResults 
                                appointmentStatus={appointmentStatus[tabValue]}
                            />
                        </div>
                    
                        
                    }
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

function mapStateToProps({ fuse }) {
    return {
        // puts Redux state here
    }
}

export default withReducer('appointmentsReducer', reducer)(withStyles(styles)(connect(mapStateToProps)(Results)))
