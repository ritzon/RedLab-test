import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { getAppointmentsResultsApi } from '../../../api';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import ReactToPrint from 'react-to-print';
import AppointmentTemplate from './AppointmentTemplate';

class DialogPrintAppointment extends React.Component {
  
  state = {
  	loaded: false
  }

  componentDidMount() {
	 this.fetchExaminations();
  }

  fetchExaminations = () => {
    const {showMessage, fetch_end, fetch_start, appointment} = this.props;
    fetch_start()
    getAppointmentsResultsApi(appointment.id).then(response => {
        if (response.status) {
          appointment.services = response.data.services;
      	  this.setState({loaded: true});
      	}
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  handleClose = () => {
    this.props.onClose();
  }
	
  render() {
    const { appointment = {}, isLoadingRequest } = this.props;
    const { loaded } = this.state;
    
    return (
		<div>
			<Dialog
			  fullWidth
			  scroll="paper"
        open={this.props.dialog}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" color="primary">
          Imprimir Cita
        </DialogTitle>
        <DialogContent>
          <div id="printPage">
          {loaded && !isLoadingRequest && (
            <AppointmentTemplate
              appointment={appointment}
              ref={el => (this.componentRef = el)}
            />
          )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancelar
          </Button>
          <ReactToPrint 
  					trigger={() => <Button disabled={!loaded} color="primary">Imprimir</Button>}
  					content={()	=> this.componentRef}
  					onAfterPrint={() => this.handleClose()}
          />
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
    fetch_end,
    fetch_start
  }, dispatch);
}

function mapStateToProps({ fuse }) {
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPrintAppointment);