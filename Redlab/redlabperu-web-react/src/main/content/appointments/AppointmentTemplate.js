import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  info: {
    borderRadius: "25px",
    border: "2px solid #000000",
    padding: "20px",
    margin: '1em',
  },
  service: {
    border: "1px solid #000000",
    padding: "5px",
    marginLeft: '2em',
    marginRight: '2em',
    marginBottom: '0.8em',
    textAlign: 'center'
  },
  examination: {
    marginLeft: '2em',
    textDecoration: 'underline'
  },
  group: {
    marginLeft: '2em',
    paddingTop: '1em',
    textDecoration: 'underline',
    fontStyle: 'italic'
  },
  spaceLeft: {
    marginLeft: '2em',
  },
  footer: {
    marginTop: '2em',
    marginLeft: '2em',
  }
});

class AppointmentTemplate extends React.Component {
  
  handleClose = () => {
    this.props.onClose();
  }  

  renderExams = (exams = []) => {
    const {classes} = this.props;
  	return (
      <div>
        {exams.map((n,index) => {
          return (
            <div>
              <h3 className={classes.examination}>
                <li>{n.name}</li>
              </h3>
            </div>
          )
        })}
      </div>
    );
  }

  render() {
    const { appointment = {}, classes } = this.props;

    return (
      <div style={{margin: '2em;'}} id="print">
        <Grid container spacing={8}>
          <Grid container className={classes.info}>
            <Grid item xs={12} justify="center">
              <h1>Información de la Cita</h1>
            </Grid>
            <Grid item xs={6} justify="center">
              <h3><b>Paciente: </b>{appointment.client.name} {appointment.client.lastNameP} {appointment.client.lastNameM}</h3>
              <h3><b>Edad: </b>{appointment.client.years}</h3>
              <h3><b>Sexo: </b>{appointment.client.genderStr}</h3>
              <h3><b>Dirección de Sede: </b>{appointment.headquarter.address}</h3>
            </Grid> 
            <Grid item xs={6} justify="center">
              <h3><b>Codigo: </b>{appointment.code}</h3>
              <h3><b>Sede: </b>{appointment.headquarter.name}</h3>
              <h3><b>Fecha: </b>{appointment.dateAppointmentEU}</h3>
              <h3><b>Hora: </b>{appointment.time12h}</h3>
            </Grid>
          </Grid>
          <Grid item xs={12} justify="center">
            <h2 className={classes.spaceLeft}>Examenes</h2>
            {appointment.services.map((serv,index) => 
                <div>
                  { this.renderExams(serv.examinations) }
                </div>
              )
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(AppointmentTemplate)