import React from 'react';
import {DialogTitle, TextField,  Button, Dialog, DialogActions, DialogContent} from '@material-ui/core';
import { hasEmptyField } from 'Utils';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from '@lodash';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';

class DialogCreateMaster extends React.Component {
  state = {
      form: {}
  }
  
  handleClose = (response) => {
    if(response)
        this.fetchApi() 
    else 
        this.props.onResponse(response);
  };
  
  fetchApi = () => {
      const { form } = this.state;
      const {showMessage, fetch_end, fetch_start, onFetchApi} = this.props
      fetch_start()
      onFetchApi(form).then(response => {
        if (response.status){
            this.props.onResponse(true);
            showMessage({ message: response.message.text, variant:"success" })
        } else {
          showMessage({ message: response.message.text, variant:"error" })
        }
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
      
  }
  
  componentDidMount = () => {
      let form = {}
      this.props.fields.forEach(f=>{
          form[f.name] = f.value || '' //Value can be set by props
      })
      this.setState({form})
  }
  
  handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.value)});
    };
    

  render() {
    const { title, fields, dialog, isLoadingRequest, notRequiredField = "" } = this.props;
    const { form } = this.state;

    return (
      <div>
        <Dialog
          open={dialog}
          onClose={() => this.handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
          <DialogContent>
              {fields.map((f, index)=>
                <TextField
                    key={index}
                    autoComplete="off"
                    className="mt-8 mb-16"
                    label={f.label}
                    id={f.name}
                    name={f.name}
                    error={form[f.name] === ''}
                    required={f.name === notRequiredField ? false : true}
                    value={form[f.name]}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                />
              )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(false)} color="primary">
              Cancelar
            </Button>
            <Button disabled={hasEmptyField(form,[`${notRequiredField}`]) || isLoadingRequest} onClick={() => this.handleClose(true)} color="primary" autoFocus>
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogCreateMaster);