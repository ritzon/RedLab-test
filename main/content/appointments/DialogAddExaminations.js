import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, 
  InputAdornment, Icon, IconButton, MenuItem } from '@material-ui/core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux'
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import { getFilterExamApi, getServicesAllApi } from '../../../api';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import DataTables from 'material-ui-datatables'; 

class DialogAddExaminations extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      deleteFlag: false,
      success: false,
      examQuery: "",
      ServiceId: "",
      examinations: [],
      services: []
    }
  }

  componentDidMount() {
    this.fetchServices();
  }

  fetchServices = () => {
    const {showMessage, fetch_start, fetch_end} = this.props;
    fetch_start()
    getServicesAllApi().then(response => {
        if (response.status) {
          this.setState({services: response.data});
        }
        }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  handleClickSearchExam = () => {
    const {showMessage, fetch_start, fetch_end} = this.props;
    fetch_start()
    getFilterExamApi(this.state.examQuery, this.state.ServiceId).then(response => {
        if (response.status) {
          this.setState({examinations: response.data});
        }
        }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.canSearch())
      this.handleClickSearchExam();
  }

  addExamations = (exam) => {
    const { examinations } = this.state;
    const { showMessage, selectedExams } = this.props;

    for (let examination of selectedExams) {
      if (examination.id === exam.id) {
        showMessage({ message: 'Examen ya se encuentra agregado.', variant: 'error' });
        return;
      }
    }
    
    let index = examinations.indexOf(exam);
    examinations.splice(index, 1);

    // sending the examination selected to the parent component
    this.setState({examinations, success: true}, () => {
      this.props.onAddExamination(exam);
      this.closeMessage();
    });
  }

  handleClose = () => {
    this.props.onClose(this.state.deleteFlag);
  }

  closeMessage = () => {
    setTimeout(() => { this.setState({success: false}) }, 2000);
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  canSearch = () => {
    const { examQuery, ServiceId } = this.state;
    
    if (examQuery.length > 0 || typeof ServiceId === 'number')
      return true;
    else
      return false;
  }

  renderSuccesMsg = () => {
    const {success} = this.state;
    return (
      <span style={{color: '#5cb85c', textAlign: 'right'}}>
        {success && 'Examen agregado'}
      </span>
    )
  }

  renderExaminations = () => {

    const TABLE_COLUMNS = [
      {
        key: "code",
        label: "Codigo"
      },
      {
        key: "name",
        label: "Nombre"
      },
      {
        key: "service",
        label: "Servicio",
        render: (val, row) => (
          <p>{val.name}</p>
        )
      },
      {
        key: "options",
        label: "opciones",
        render: (row, rows) => (
          <Button
            onClick={() => this.addExamations(rows)}
            color="primary"
            size="small"
          >
            Agregar
          </Button>
        )
      }
  ];
  
  return (
      <MuiThemeProvider>
        <DataTables
          height={'auto'}
          selectable={false}
          showRowHover={true}
          columns={TABLE_COLUMNS}
          data={this.state.examinations}
          showCheckboxes={false}
          showFooterToolbar={false}
        />
      </MuiThemeProvider>
  );
  }

  render() {
    const { services } = this.state;

    return (
      <div>
        <Dialog
          fullWidth
          open={this.props.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Asignar examenes { this.renderSuccesMsg() }</DialogTitle>
          <DialogContent>
            <div style={{display:"flex", justifyContent:"left"}}>
              <TextField
                className="mt-8 mb-16 mr-8 ml-8"
                required
                label="Buscar examen"
                name="examQuery"
                value={this.state.examQuery}
                onChange={this.handleChange}
                id="name"
                variant="outlined"
                fullWidth
                onKeyPress={this.handleKeyPress}
                autoComplete="off"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          disabled={!this.canSearch()}
                          onClick={this.handleClickSearchExam}
                        >
                          <Icon className="mr-4 text-20">search</Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                }}
              />
              <TextField
                id="standard-select-currency"
                className="mt-8 mb-16 mr-8 ml-8"
                select
                label="Servicio"
                name="ServiceId"
                value={this.state.ServiceId}
                onChange={this.handleChange}
                helperText="Seleccione uno"
                variant="outlined"
                fullWidth
              > 
                <MenuItem value={""}>No seleccionar</MenuItem>
                {services.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name} {option.lastNameP}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <h5>Exámenes</h5>
            { this.renderExaminations() }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} disabled={this.props.isLoadingRequest} color="primary">
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddExaminations);
