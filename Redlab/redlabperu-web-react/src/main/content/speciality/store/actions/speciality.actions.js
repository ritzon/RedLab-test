import {showMessage, fetch_start, fetch_end} from 'store/actions/fuse';
import { saveSpecialityApi, editSpecialityApi, getSpecialityApi, deleteSpecialityApi } from '../../../../../api';
import history from 'history.js';

export const GET_SPECIALITY = 'GET SPECIALITY';
export const SAVE_SPECIALITY = 'SAVE SPECIALITY';
export const CAN_SAVE = 'CAN SAVE';
export const CLOSE_DIALOG = 'CLOSE DIALOG';

export function deleteSpeciality(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        deleteSpecialityApi(id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/specialties'
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

export function setCard(card)
{
    return {
        type   : CAN_SAVE,
        payload: card
    }
     
}

export function getSpeciality(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getSpecialityApi(id).then(response => {
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

export function saveSpeciality(data)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        saveSpecialityApi(data).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/specialties'
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

export function editSpeciality(data, id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editSpecialityApi(data, id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/specialties'
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

export function closeDialog()
{
    return {
        type   : CLOSE_DIALOG,
    }
}


export function newSpeciality()
{
    const data = {
        name: "",
        description: ""

    };

    return {
        type   : GET_SPECIALITY,
        payload: data
    }
}
