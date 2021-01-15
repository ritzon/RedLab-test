import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { connect } from 'react-redux'
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import { getAppointmentsResultsApi } from '../../../api';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import NumberFormat from 'react-number-format';
import { mergeExaminations } from 'Utils';

class DialogAppointment extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      deleteFlag: false
    }
  }

  componentDidMount() {
    this.fetchExaminations()
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

  handleClose = () => {
    this.props.onClose(this.state.deleteFlag);
  }

  handleAceppt = () => {
    this.props.deleteAppointment(this.props.appointment.id);
    this.setState({deleteFlag: true}, () => { this.handleClose() });
  }

  renderExaminations = () => {
    const { appointment = {} } = this.props;
    const exams = appointment.examinations ? appointment.examinations : [];

    return (
      <div>
        {exams.map((n,index) => {
          return (
            <span key={index}>
              <Divider variant="middle" />
              <p><b>Nombre: </b>{n.name}</p>
              <Divider variant="middle" />
            </span>
          )
        })}
      </div>
    );
  }

  render() {
    const { appointment = {} } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Detalle de la Cita</DialogTitle>
          <DialogContent>
            <div>
              <p>¿Seguro que desea cancelar la Cita?</p>
              <p><b>Paciente: </b>{appointment.client.name} {appointment.client.lastNameP}</p>
              <p><b>Fecha: </b>{appointment.dateAppointmentEU}</p>
              <p><b>Hora: </b>{appointment.time12h}</p>
              <p><b>Precio Total: </b>
              <NumberFormat 
                thousandSeparator="."
                decimalSeparator=","
                prefix="S/. "
                value={appointment.totalPrice}  
              />
              </p>
              <h5>Exámenes:</h5>
              <br/>
              { this.renderExaminations() }
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleAceppt} disabled={this.props.isLoadingRequest} color="primary">
              Aceptar
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
      deleteAppointment: Actions.deleteAppointment,
      showMessage,
      fetch_start,
      fetch_end
  }, dispatch);
}

function mapStateToProps({appointmentReducer, fuse})
{
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAppointment);
