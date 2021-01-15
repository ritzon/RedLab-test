import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse'
import { getPassword } from '../../../../../api';
import history from 'history.js';
export const GET_USER = 'GET USER';
export const SAVE_USER = 'SAVE USER';
export const CLOSE_DIALOG = 'CLOSE DIALOG';
export const CAN_SAVE = 'CAN SAVE';

export function recoverPassword(email)
{ 
    return (dispatch) =>{
        dispatch(fetch_start())
        getPassword(email).then(response => {
            if(response.status){
                dispatch(showMessage({message: "Por favor revise su bandeja de correo", variant:"info"}))
                history.push({
                    pathname: '/login'
                });
            }
                
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
}

export function closeDialog()
{
    return {
        type   : CLOSE_DIALOG,
    }
}

