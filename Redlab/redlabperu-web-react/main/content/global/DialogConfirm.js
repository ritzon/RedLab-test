import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogConfirm extends React.Component {
  
  handleClose = (response) => {
    this.props.onResponse(response);
  };

  render() {
    const { title = '¿Confirmar?', description = '', open } = this.props;
    
    return (
      <div>
        <Dialog
          open={open}
          onClose={() => this.handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              { description }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => this.handleClose(true)} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DialogConfirm;