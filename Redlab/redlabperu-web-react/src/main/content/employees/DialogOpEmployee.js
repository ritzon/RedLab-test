import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab} from '@material-ui/core';
import { connect } from 'react-redux'
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';


class DialogOpEmployee extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    }
  }
  
  renderDigitalSignature = (employee) => {
    const { person: { digitalSignatureUrl } } = employee
    if(digitalSignatureUrl)
      return (
        <a href={digitalSignatureUrl} rel="noopener noreferrer" target='_blank'>Descargar</a>
      )
    else
      return "No posee firma en el sistema"
  }
  
  handleClose = () => {
    this.props.onClose();
  }
  
  handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

  handleAceppt = () => {
    this.props.onClose();
    this.props.deleteEmployee(this.props.employee.user.id);
  }
    

  render() {
    const { employee = {}, dialog, flagDelete } = this.props
    const { tabValue } = this.state
    return (
      <div>
        <Dialog
          open={dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
          {flagDelete && '¿Seguro que desea eliminar este empleado?'}
          {!flagDelete && 'Detalles del empleado'}
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
                <Tab className="h-64 normal-case" label="Profesión"/>
                <Tab className="h-64 normal-case" label="Usuario"/>
            </Tabs>
          </DialogTitle>
          <DialogContent>
            {tabValue === 0 && (
              <div>
                    <p><b>Tipo de documento: </b>{employee.typeDoc.name}</p>
                    <p><b>Nro. de documento: </b>{employee.typeDoc.dni}</p>
                    <p><b>Nombres: </b>{employee.person.name}</p>
                    <p><b>Apellido paterno: </b>{employee.person.lastNameP}</p>
                    <p><b>Apellido materno: </b>{employee.person.lastNameM}</p>
                    <p><b>Teléfono móvil: </b>{employee.person.phoneNumber}</p>
                    <p><b>Teléfono fijo: </b>{employee.person.tlfNumber}</p>
                    <p><b>Género: </b>{employee.person.genderStr}</p>
                    <p><b>Estatus civil: </b>{employee.person.civilStatusStr}</p>
                    <p><b>Fecha de nacimiento: </b>{employee.person.birthDate}</p>
                    <p><b>Fecha de admisión: </b>{employee.person.admissionDate}</p>
                </div>
            )}
            {tabValue === 1 && (
                <div>
                    <p><b>Departamento: </b>{employee.region.name}</p>
                    <p><b>Provincia: </b>{employee.province.name}</p>
                    <p><b>Distrito: </b>{employee.district.name}</p>
                    <p><b>Tipo de dirección: </b>{employee.person.typeDirectionStr}</p>
                    <p><b>Punto de referencia: </b>{employee.person.referencePoint}</p>
                    <p><b>Dirección: </b>{employee.person.address}</p>
                </div>
            )}
            {tabValue === 2 && (
                <div>
                    <p><b>Especialidad: </b>{employee.speciality.name}</p>
                    <p><b>Cargo: </b>{employee.typeEmployee.name}</p>
                    <p><b>Profesión: </b>{employee.profession.name}</p>
                    <p><b>Colegiatura 1: </b>{employee.tuition.name}</p>
                    <p><b>Nro de colegiatura: </b>{employee.tuition.tuitionNumber}</p>
                    <p><b>Colegiatura 2: </b>{employee.tuition2.name}</p>
                    <p><b>Nro de colegiatura: </b>{employee.tuition2.tuitionNumber}</p>
                    <p><b>Firma digital: </b>{this.renderDigitalSignature(employee)}</p>
                </div>
            )}
            {tabValue === 3 && (
                <div>
                    <p><b>Correo: </b>{employee.user.username}</p>
                    <p><b>Roles: </b>{employee.roles.map(i=>i.name).join(',')}</p>
                    <p><b>Sede: </b>{employee.headquarter.name}</p>
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
    deleteEmployee: Actions.deleteEmployee,
  }, dispatch);
}

function mapStateToProps({employeesReducer, fuse})
{
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOpEmployee);
