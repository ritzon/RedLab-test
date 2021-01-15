import {showMessage, fetch_start, fetch_end} from 'store/actions/fuse';
import { saveAgreementApi, getAgreementApi, editAgreementApi, deleteAgreementApi } from '../../../../../api';
import history from 'history.js';

export const GET_AGREEMENT = 'GET AGREEMENT';
export const SAVE_AGREEMENT = 'SAVE AGREEMENT';
export const CAN_SAVE = 'CAN SAVE';
export const CLOSE_DIALOG = 'CLOSE DIALOG';
export const DELETE_CARD = 'DELETE CARD';

export function deleteAgreement(agreementId)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        deleteAgreementApi(agreementId).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/agreements'
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

export function setAgreement(agreement)
{
    return {
        type   : CAN_SAVE,
        payload: agreement
    }
     
}

export function getAgreement(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getAgreementApi(id).then(response => {
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

export function saveAgreement(data)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        saveAgreementApi(data).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/agreements'
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

export function editAgreement(data, id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editAgreementApi(data, id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/agreements'
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
        type   : CLOSE_DIALOG,
    }
}


export function newAgreement()
{
    const data = {
        name: "",
        tlfNumber: "",
        address: "",
        ruc: "",
        email: "",
        description: "",
        TypeAgreementId: ""
    };

    return {
        type   : GET_AGREEMENT,
        payload: data
    }
}
