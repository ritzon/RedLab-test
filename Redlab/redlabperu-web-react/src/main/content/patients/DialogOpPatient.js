import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab} from '@material-ui/core';
import { connect } from 'react-redux'
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';


class DialogOpPatient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    }
  }

  handleClose = () => {
    this.props.onClose();
  }
  
  handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

  handleAceppt = () => {
    this.props.onClose();
    this.props.deletePatient(this.props.patient.user.id);
  }
    

  render() {
    const { patient = {}, dialog, flagDelete } = this.props
    const { tabValue } = this.state
    return (
      <div>
        <Dialog
          open={dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
          {flagDelete && '¿Seguro que desea eliminar este paciente?'}
          {!flagDelete && 'Detalles del paciente'}
            <Tabs
                value={tabValue}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
                variant="fullWidth"
                classes={{root: "w-full h-64"}}
            >
                <Tab className="h-64 normal-case" label="Datos personales"/>
                <Tab className="h-64 normal-case" label="Domicilio"/>
                <Tab className="h-64 normal-case" label="Datos de contacto"/>
            </Tabs>
          </DialogTitle>
          <DialogContent>
            {tabValue === 0 && (
              <div>
                    <p><b>Tipo de documento: </b>{patient.typeDoc.name}</p>
                    <p><b>Nro. de documento: </b>{patient.typeDoc.dni}</p>
                    <p><b>Nro. de historia clínica: </b>{patient.person.historyNumber}</p>
                    <p><b>Nombres: </b>{patient.person.name}</p>
                    <p><b>Apellido paterno: </b>{patient.person.lastNameP}</p>
                    <p><b>Apellido materno: </b>{patient.person.lastNameM}</p>
                    <p><b>Género: </b>{patient.person.genderStr}</p>
                    <p><b>Estatus civil: </b>{patient.person.civilStatusStr}</p>
                    <p><b>Fecha de nacimiento: </b>{patient.person.birthDate}</p>
                    <p><b>Nacionalidad: </b>{patient.person.nationality}</p>
                </div>
            )}
            {tabValue === 1 && (
                <div>
                    <p><b>Departamento: </b>{patient.region.name}</p>
                    <p><b>Provincia: </b>{patient.province.name}</p>
                    <p><b>Distrito: </b>{patient.district.name}</p>
                    <p><b>Dirección: </b>{patient.person.address}</p>
                </div>
            )}
            {tabValue === 2 && (
                <div>
                    <p><b>Correo: </b>{patient.user.username}</p>
                    <p><b>Teléfono móvil: </b>{patient.person.phoneNumber}</p>
                    <p><b>Teléfono fijo: </b>{patient.person.tlfNumber}</p>
                    <p><b>Roles: </b>{patient.roles.map(i=>i.name).join(',')}</p>
                </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            {flagDelete && <Button onClick={this.handleAceppt} disabled={this.props.isLoadingRequest} color="primary">
              Eliminar
            </Button>}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch)
{
  return bindActionCreators({
    deletePatient: Actions.deletePatient,
  }, dispatch);
}

function mapStateToProps({patientsReducer, fuse})
{
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOpPatient);
