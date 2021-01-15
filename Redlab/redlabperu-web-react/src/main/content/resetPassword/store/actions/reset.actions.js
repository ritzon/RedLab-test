import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import { resetApiPassword, getConfirmToken } from '../../../../../api';

import history from 'history.js';

export const GET_USER = 'GET USER';
export const SET_USER = 'SET USER';
export const CLOSE_DIALOG = 'CLOSE DIALOG';




export function saveNewPassword(id, pass)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        resetApiPassword(id, pass).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
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
export function confirmToken(userId, token)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getConfirmToken(userId, token).then(response => {
            console.log(response);
            if(response.status){
                dispatch({
                    type   : SET_USER,
                    payload: response.data.user
                })
            }
            else
            {
                history.push({
                    pathname: '/login'
                });
                dispatch(showMessage({message: response.message.text, variant:"error"}))
            }
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
            history.push({
                pathname: '/login'
            });
        }).finally(() => dispatch(fetch_end()))
    }
}
export function closeDialog()
{
    return {
        type   : CLOSE_DIALOG,
    }
}


