import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';


class DialogAgreement extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: props.dialog,
      deleteFlag: false
    }
  }

  handleClose = () => {
    this.props.onClose(this.state.deleteFlag);
  }

  handleAceppt = () => {
    this.props.deleteAgreement(this.props.agreement.id);
    this.setState({deleteFlag: true}, () => { this.handleClose() });
  }

  render() {
    const { agreement = {} } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Detalle del Convenio</DialogTitle>
          <DialogContent>
            <div>
            <p>¿Seguro que desea eliminar el Convenio?</p>
            <p><b>Nombre: </b>{agreement.name}</p>
            <p><b>Descripción: </b>{agreement.description}</p>
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
      deleteAgreement: Actions.deleteAgreement,
  }, dispatch);
}

function mapStateToProps({cardsReducer, fuse})
{
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAgreement);
