import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import { saveUserApi } from '../../../../../api';
import history from 'history.js';

export const GET_USER = 'GET USER';
export const SAVE_USER = 'SAVE USER';
export const CAN_SAVE = 'CAN SAVE';
export const CLOSE_DIALOG = 'CLOSE DIALOG';
export const DELETE_USER = 'DELETE USER';


export function setUser(user)
{
    return {
        type   : CAN_SAVE,
        payload: user
    }
     
}

export function saveUser(user)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        saveUserApi(user).then(response => {
            if(response.ok){
                dispatch(showMessage({message: "Usuario Registrado con Exito", variant:"success"}))
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