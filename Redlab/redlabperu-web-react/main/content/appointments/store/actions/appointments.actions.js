import { getAppointmentsApi, getFilterAppointmentsApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import { getCurrentDate } from 'Utils';

export const GET_APPOINTMENTS = 'GET APPOINTMENTS';
export const CLEAR_APPOINTMENTS = 'CLEAR APPOINTMENTS';
export const GET_APPOINTMENTS_MOBILE = 'GET APPOINTMENTS MOBILE';
export const SET_APPOINTMENTS_SEARCH_TEXT = 'SET APPOINTMENTS SEARCH TEXT';

export function getAppointments(start, end, status, date = null)
{   

    let dateNow = date ? date : getCurrentDate();
    console.log(status)
    return (dispatch) =>{
        dispatch(fetch_start())
        getAppointmentsApi(start,end, status, dateNow).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_APPOINTMENTS,
                    payload: response
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

export function getAppointmentsMobile(start, end, status, date = null)
{   
    let dateNow = date ? date : getCurrentDate();
    return (dispatch) =>{
        dispatch(fetch_start())
        getAppointmentsApi(start,end, status, dateNow).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_APPOINTMENTS_MOBILE,
                    payload: response
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

export function searchAppointments(criteria, query, status)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getFilterAppointmentsApi(criteria,query, status).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_APPOINTMENTS,
                    payload: response
                })
            }
            else
                dispatch(showMessage({ message: response.message.text, variant:"error" }))
        }
        , err => {
            console.log(err)
            dispatch(showMessage({ message: 'Error de conexión', variant:"error" }))
        }).finally(() => dispatch(fetch_end()))
    }
}

export function clearAppointments()
{
    return {
        type: CLEAR_APPOINTMENTS,
    }
}
