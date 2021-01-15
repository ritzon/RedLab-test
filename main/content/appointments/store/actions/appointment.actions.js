import { saveAppointmentApi, getAppointmentApi, editAppointmentApi, deleteAppointmentApi, attendAppointmentApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import { getCurrentDate, getCurrentTime } from 'Utils';
import history from 'history.js';

export const GET_APPOINTMENT = 'GET APPOINTMENT';
export const CAN_SAVE = 'CAN SAVE';
export const CLOSE_DIALOG = 'CLOSE DIALOG';

export function deleteAppointment(id)
{   
    return (dispatch) =>{
        
        dispatch(fetch_start())
        deleteAppointmentApi(id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/appointments'
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

export function setAppointment(appointment)
{
    return {
        type   : CAN_SAVE,
        payload: appointment
    }
     
}

export function getAppointment(id)
{   
    return (dispatch) =>{
        dispatch(fetch_start())
        getAppointmentApi(id).then(response => {
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

export function saveAppointment(data)
{   
    return (dispatch) =>{
        dispatch(fetch_start())
        saveAppointmentApi(data).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/appointments'
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

export function editAppointment(data, id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editAppointmentApi(data, id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/appointments'
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

export function attendAppointment(data, id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        attendAppointmentApi(data, id).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/results'
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
        type: CLOSE_DIALOG,
    }
}


export function currentAppointment(form) {
    const data = form;
    return {
        type    : GET_APPOINTMENT,
        payload : data
    }
}

export function newAppointment()
{
    const data = {
        dateAppointment: getCurrentDate(),
        time: getCurrentTime(),
        AgreementId: "",
        PriceListId: "",
        HeadquarterId: ""
    };

    return {
        type   : GET_APPOINTMENT,
        payload: data
    }
}

