import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {logoImg, signatureImg} from 'constant';

const styles = theme => ({
  info: {
    borderRadius: "25px",
    border: "2px solid #000000",
    padding: "20px",
    marginLeft: '1em',
    marginRight: '1em'
  },
  service: {
    border: "2px solid #000000",
    padding: "5px",
    marginLeft: '2em',
    marginRight: '2em',
    marginBottom: '0.8em',
    textAlign: 'center'
  },
  examination: {
    marginLeft: '1em',
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
  left: '0',
  bottom: '0',
  width: '100%'
}
});

class TemplateToPrint extends React.Component {
  
  handleClose = () => {
    this.props.onClose();
  }  

  renderReferencesValues = (referenceValues = []) => {
	
  	return (
  		<Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Resultados</TableCell>
            <TableCell align="right">Unidad</TableCell>
            <TableCell align="right">Rangos referenciales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {referenceValues.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right"><b>{row.value}</b></TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right" style={{whiteSpace: 'pre-line'}}>{row.allValues}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  	);
  }

  renderGroups = (groups = []) => {
    const {classes} = this.props;
    return (
      <div>
        {groups.map((n, index) => {
          return (
            <div>
              <h5 className={classes.group}>
                {n.name}
              </h5>
              <Typography component="p">
                { this.renderReferencesValues(n.referenceValues) }
              </Typography>
            </div>
          )
        })}
      </div>
    )
  }

  renderExams = (exams = []) => {
    const {classes} = this.props;
  	return (
      <div>
        {exams.map((n,index) => {
          return (
            <div>
              <h3 className={classes.examination}>
                {n.name}
              </h3>
              <Typography component="p">
                { this.renderGroups(n.groups) }
              </Typography>
	      	  </div>
          )
        })}
      </div>
    );
  }

  render() {
    const { appointment = {}, classes } = this.props;
    const baseLogo = "data:image/png;base64,"+logoImg;
    const baseSignature = "data:image/png;base64,"+signatureImg;

    return (
      <div style={{margin: '2em;'}} id="print">
        <Grid container spacing={8}>
          <Grid item xs={12} justify="center">
            <img src={baseLogo} style={{float: 'right'}} alt="logo" />
          </Grid>
          <Grid container className={classes.info}>
            <Grid item xs={6} justify="center">
              <h3><b>Paciente: </b>{appointment.client.name} {appointment.client.lastNameP} {appointment.client.lastNameM}</h3>
              <h3><b>Edad: </b>{appointment.client.years}</h3>
              <h3><b>Sexo: </b>{appointment.client.genderStr}</h3>
              <h3><b>Medico: </b>{appointment.specialityName}</h3>
            </Grid> 
            <Grid item xs={6} justify="center">
              <h3><b>Codigo: </b>{appointment.code}</h3>
              <h3><b>Sede: </b>{appointment.headquarter.name}</h3>
              <h3><b>Fecha: </b>{appointment.dateAppointmentEU}</h3>
              <h3><b>Hora: </b>{appointment.time12h}</h3>
            </Grid>
          </Grid>
          <Grid item xs={12} justify="center">
            {appointment.services.map((serv,index) => 
                <div>
                  <div className={classes.service}>
                    <h3>{serv.name}</h3>
                  </div>
                  { this.renderExams(serv.examinations) }
                </div>
              )
            }
          </Grid>
          <Grid item xs={12} justify="left">
            <div className={classes.spaceLeft}>
              <h3>Observaciones:</h3>
              <p style={{whiteSpace: 'pre-line'}}>{appointment.result}</p>
            </div>
          </Grid>
          <Grid item xs={8} justify="center">
            <div className={classes.footer}>
              <p><b>CENTRAL</b> {appointment.headquarter.name}</p>
              <p><b>Dirección: </b> {appointment.headquarter.address}</p>
              <p><b>TELF.:</b> {appointment.headquarter.tlfNumber}</p>
              <p><b>EMAIL:</b> administracion@redlabperu.com</p>
              <p><b>www.redlabperu.com</b></p>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <img src={baseSignature} alt="signature" style={{float: 'right'}}/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(styles)(TemplateToPrint)