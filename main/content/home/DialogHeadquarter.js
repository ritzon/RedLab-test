import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import _ from '@lodash';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import { editHeadquarterApi, getHeadquarterApi, saveHeadquarterApi } from '../../../api';

const initialState = {
  name: "",
  address: "",
  tlfNumber: ""
}

class DialogHeadquarter extends React.Component {

  state = {
    image: null,
    form: null
  }

  componentDidMount = () => {
    if (this.props.create)
      this.setState({form: initialState});
    else
      this.setState({form: this.props.headquarter});
  }

  fetchUpdateHeadquarter = (id, data) => {
    const {showMessage, fetch_end, fetch_start} = this.props;
    console.log("pase por aqui")
    fetch_start()
    editHeadquarterApi(id, data).then(response => {
        if (response.status) {
          showMessage({ message: response.message.text, variant:"success" });
          this.fetchGetHeadquarter(id);
          this.handleClose();
        }
        }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  fetchCreateHeadquarter = (data) => {
    const {showMessage, fetch_end, fetch_start} = this.props;
    fetch_start()
    saveHeadquarterApi(data).then(response => {
        if (response.status) {
          showMessage({ message: response.message.text, variant:"success" });
          this.handleClose();
        }
        }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  fetchGetHeadquarter = (id) => {
    const {showMessage, fetch_end, fetch_start} = this.props;
    fetch_start()
    getHeadquarterApi(id).then(response => {
        if (response.status) {
          localStorage.setItem('headquarterImg', response.data.urlImage);
        }
        }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  handleSelectFile = (event) => {
    this.setState({[event.target.name]: event.target.files[0]});
  }

  handleUpload = () => {
    const { form, image } = this.state;
    const { headquarter, create } = this.props;
    let formData = new FormData();

    formData.append('body', JSON.stringify(form));

    if (image)
      formData.append('file', image);

    if (create)
      this.fetchCreateHeadquarter(formData);
    else
      this.fetchUpdateHeadquarter(headquarter.id, formData);
  }

  handleChange = (event) => {
    this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
  }

  handleClose = () => {
    this.props.onClose()
  }
    
  render() {
    const { form } = this.state;
    const { headquarter = {}, open, isLoadingRequest } = this.props;
    const image = headquarter.urlImage ? headquarter.urlImage : "";

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          open={open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Información de Sede</DialogTitle>
          <DialogContent>
            {form && (
              <div className="flex flex-1" style={{flexDirection:'column'}}>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <TextField
                    className="mt-8 mb-16 mr-8 ml-8"
                    label="Nombre"
                    id="name"
                    name="name"
                    value={form.name}
                    fullWidth
                    onChange={this.handleChange}
                    variant="outlined"
                    autoComplete="off"
                  />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <TextField
                    className="mt-8 mb-16 mr-8 ml-8"
                    label="Direccion"
                    id="address"
                    name="address"
                    value={form.address}
                    fullWidth
                    onChange={this.handleChange}
                    variant="outlined"
                    autoComplete="off"
                  />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <TextField
                    className="mt-8 mb-16 mr-8 ml-8"
                    label="Telefono"
                    id="tlfNumber"
                    name="tlfNumber"
                    value={form.tlfNumber}
                    fullWidth
                    onChange={this.handleChange}
                    variant="outlined"
                    autoComplete="off"
                  />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <TextField
                    className="mt-8 mb-16 mr-8 ml-8"
                    label="Imagen de fondo"
                    id="image"
                    name="image"
                    type="file"
                    fullWidth
                    onChange={this.handleSelectFile}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    autoComplete="off"
                  />
                </div>
                {headquarter.urlImage && (
                  <div>
                    <h4>Fondo actual</h4><br/>
                    <img style={{width: '20em', height: '10em'}} src={image} alt="fondo" />
                  </div>
                )}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cerrar
            </Button>
            <Button onClick={this.handleUpload} disabled={isLoadingRequest} color="primary">
              Guardar
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
      fetch_end,
      fetch_start
  }, dispatch);
}

function mapStateToProps({fuse})
{
    return {
        isLoadingRequest: fuse.request.loading > 0,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DialogHeadquarter);
