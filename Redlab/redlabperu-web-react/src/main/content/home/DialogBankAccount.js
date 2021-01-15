import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';



class DialogBankAccount extends React.Component {

    handleClose = () => {
        this.props.onClose()
      }
    

  render() {
    const { onClose, ...other } = this.props;
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          {...other}
        >
          <DialogTitle id="form-dialog-title">Información de depósito</DialogTitle>
          <DialogContent>
           
                <div className="flex flex-1 items-center justify-center" style={{flexDirection:'column'}}>
                    <Typography style={{margin: '10px 0 10px 0'}} variant="body2">BANESCO</Typography>
                    <Typography style={{margin: '10px 0 10px 0'}} variant="body2">CUENTA CORRIENTE</Typography>
                    <Typography style={{margin: '10px 0 10px 0'}} variant="body2">0134-0879-3987-9101-6895</Typography>
                    <Typography style={{margin: '10px 0 10px 0'}} variant="body2">INVERSIONES RV & MM C.A.</Typography>
                    <Typography style={{margin: '10px 0 10px 0'}} variant="body2">RIF: J-40340670-7</Typography>
                </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default DialogBankAccount;
