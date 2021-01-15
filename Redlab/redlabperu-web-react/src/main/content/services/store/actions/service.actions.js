import { getServiceApi, saveServiceApi, editServiceApi, deleteServiceApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import history from 'history.js';

export const GET_SERVICE = 'GET SERVICE';
export const SAVE_SERVICE = 'SAVE SERVICE';
export const CAN_SAVE = 'CAN SAVE';
export const CLOSE_DIALOG = 'CLOSE DIALOG';

export function deleteService(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        deleteServiceApi(id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/services'
                });
            }
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        })
        .finally(()=>{
            dispatch(fetch_end())
        })
    }
}

export function setService(service)
{
    return {
        type   : CAN_SAVE,
        payload: service
    }
     
}

export function getService(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getServiceApi(id).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : CAN_SAVE,
                    payload: response.data
                })
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
     
}

export function saveService(data)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        saveServiceApi(data).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/services'
                });
            }
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        })
        .finally(()=>{
            dispatch(fetch_end())
        })
    }
}

export function editService(data, id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editServiceApi(data, id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/services'
                });
            }
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        })
        .finally(()=>{
            dispatch(fetch_end())
            dispatch({
                type   : CLOSE_DIALOG,
            })
        })
    }
}

export function closeDialog()
{
    return {
        type: CLOSE_DIALOG,
    }
}


export function newService()
{
    const data = {
        name: "",
        description: ""
    };

    return {
        type   : GET_SERVICE,
        payload: data
    }
}

