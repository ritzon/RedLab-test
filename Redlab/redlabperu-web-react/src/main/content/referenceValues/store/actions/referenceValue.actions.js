import { getReferenceValueApi, saveReferenceValueApi, editReferenceValueApi, deleteReferenceValueApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import history from 'history.js';

export const GET_REFERENCE_VALUE = 'GET REFERENCE VALUE';
export const SAVE_REFERENCE_VALUE = 'SAVE REFERENCE VALUE';
export const CAN_SAVE = 'CAN SAVE';
export const CLOSE_DIALOG = 'CLOSE DIALOG';

export function deleteReferenceValue(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        deleteReferenceValueApi(id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/referenceValues'
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

export function setReferenceValue(referenceValue)
{
    return {
        type   : CAN_SAVE,
        payload: referenceValue
    }
     
}

export function getReferenceValue(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getReferenceValueApi(id).then(response => {
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

export function saveReferenceValue(data)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        saveReferenceValueApi(data).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/referenceValues'
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

export function editReferenceValue(data, id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editReferenceValueApi(data, id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/referenceValues'
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


export function newReferenceValue()
{
    const data = {
        name: "",
        unit: ""
    };

    return {
        type   : GET_REFERENCE_VALUE,
        payload: data
    }
}

