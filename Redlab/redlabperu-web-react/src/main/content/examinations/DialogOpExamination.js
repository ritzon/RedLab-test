import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab} from '@material-ui/core';
import { connect } from 'react-redux'
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';


class DialogOpExamination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0
    }
  }
  
  renderDigitalSignature = (examination) => {
    const { person: { digitalSignatureUrl } } = examination
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
    this.props.deleteExamination(this.props.examination.id);
  }
    

  render() {
    const { examination = {}, dialog, flagDelete } = this.props
    const { tabValue } = this.state
    return (
      <div>
        <Dialog
          open={dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
          {flagDelete && '¿Seguro que desea eliminar este examen?'}
          {!flagDelete && 'Detalles del examen'}
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
                <Tab className="h-64 normal-case" label="Datos básicos"/>
                <Tab className="h-64 normal-case" label="Valores referenciales"/>
                <Tab className="h-64 normal-case" label="Datos técnicos"/>
            </Tabs>
          </DialogTitle>
          <DialogContent>
            {tabValue === 0 && (
              <div>
                    <p><b>Nombre: </b>{examination.name}</p>
                    <p><b>Servicio: </b>{examination.service.name}</p>
                    <p><b>Metodología: </b>{examination.method !== undefined ? examination.method.name : "" }</p>
                    <p style={{whiteSpace: "pre-line"}}><b>Indicaciones: </b>{examination.indications}</p>
                </div>
            )}
            {tabValue === 1 && (
                <div>
                  {examination.referenceValues.map(rV => 
                    <p style={{whiteSpace: "pre-line"}} key={rV.id}>
                      <b>{rV.name} ({rV.unit}): </b>{rV.allValues}
                    </p>
                  )}
                </div>
            )}
            {tabValue === 2 && (
              <div>
                    <p><b>Tipo(s) de muestra: </b>{examination.typeSample}</p>
                    <p><b>Volumen: </b>{examination.volume}</p>
                    <p><b>Insumos: </b>{examination.supplies}</p>
                    <p><b>Temperatura de conservación: </b>{examination.storageTemperature}</p>
                    <p><b>Condiciones de ayuno: </b>{examination.fastingConditions}</p>
                    <p><b>Frecuencia de corridas: </b>{examination.runFrequency}</p>
                    <p><b>Hora de proceso: </b>{examination.processTime}</p>
                    <p><b>Tiempo de reporte: </b>{examination.reportTime}</p>
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
    deleteExamination: Actions.deleteExamination,
  }, dispatch);
}

function mapStateToProps({examinationsReducer, fuse})
{
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogOpExamination);
