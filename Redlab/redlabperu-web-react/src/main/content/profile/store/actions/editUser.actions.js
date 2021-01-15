import { changeApiPassword, editUserApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse'
import { submitLogin} from 'auth/store/actions'

export const EDIT_USER = 'EDIT USER';

export function editUser(user,userId, person = 'employee')
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editUserApi(user,userId, person).then(response => {
            console.log(response);
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                const credentials = JSON.parse(localStorage.getItem('credentials'));
                dispatch(submitLogin(credentials));
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


export function changePassword(id, pass)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        changeApiPassword(id, pass).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                localStorage.setItem('password',pass.password)
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