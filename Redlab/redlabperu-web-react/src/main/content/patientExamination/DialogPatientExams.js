import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab} from '@material-ui/core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'
import { getAppointmentsResultsApi } from '../../../api';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
//import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import DataTables from 'material-ui-datatables';
import { mergeExaminations } from 'Utils';

class DialogPatientExams extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    }
  }

  componentDidMount() {
    this.fetchExaminations();
  }

  fetchExaminations = () => {
    const {showMessage, fetch_end, fetch_start, appointment} = this.props;
    fetch_start()
    getAppointmentsResultsApi(appointment.id).then(response => {
      if (response.status) {
        appointment.examinations = mergeExaminations(response.data.services);
      }
    }, err => {
      console.log(err)
      showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  handleChangeTab = (event, tabValue) => {
    this.setState({tabValue});
  };

  handleClose = () => {
   this.props.onClose();
  }

  renderTableExaminations = () => {
    const { appointment: { examinations = [] } } = this.props;
    
    const TABLE_COLUMNS = [
      {
        key: "code",
        label: "Codigo examen"
      },
      {
        key: "name",
        label: "Examen"
      }
    ];
      
    return (
      <MuiThemeProvider>
        <DataTables
          height={'auto'}
          selectable={false}
          showRowHover={true}
          columns={TABLE_COLUMNS}
          data={examinations}
          showCheckboxes={false}
          showFooterToolbar={false}
        />
      </MuiThemeProvider>
    );
  }

  render() {
    const { appointment = {} } = this.props;
    
    return (
      <div>
        <Dialog
          open={this.props.dialog}
          onClose={this.handleClose}
          fullWidth
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Tabs
                value={this.state.tabValue}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
                variant="fullWidth"
                classes={{root: "w-full h-64"}}
              >
                <Tab className="h-64 normal-case" label="Datos básicos"/>
                <Tab className="h-64 normal-case" label="Exámenes"/>
            </Tabs>
          </DialogTitle>
          <DialogContent>
            {this.state.tabValue === 0 && (
              <div>
                <h3><b>Fecha: </b>{appointment.dateAppointmentEU}</h3>
                <h3><b>Hora: </b>{appointment.time12h}</h3>
                <h3><b>Medico: </b>{appointment.specialityName}</h3>
                <h3><b>Sede: </b>{appointment.headquarter.name}</h3>
              </div>
            )}
            {this.state.tabValue === 1 && (
              <div>
                <h5>Exámenes</h5>
                { this.renderTableExaminations() }
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch)
{
  return bindActionCreators({
    showMessage,
    fetch_start,
    fetch_end
  }, dispatch);
}

function mapStateToProps({cardsReducer, fuse})
{
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPatientExams);