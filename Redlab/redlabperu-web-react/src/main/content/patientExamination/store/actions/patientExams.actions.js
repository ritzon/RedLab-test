import { getAppointmentsPatientApi, getFilterPatientAppointmentsApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_PATIENT_APPOINTMENTS = 'GET PATIENT APPOINTMENTS';
export const GET_PATIENT_APPOINTMENTS_MOBILE = 'GET PATIENT APPOINTMENTS MOBILE';
export const CLEAR_PATIENT_EXAMS = 'CLEAR PATIENT EXAMS';

export function getPatientExams(start, end, id) {
	return (dispatch) =>{
        dispatch(fetch_start())
        getAppointmentsPatientApi(start,end,id).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_PATIENT_APPOINTMENTS,
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

export function getPatientExamsMobile(start, end, id) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getAppointmentsPatientApi(start,end,id).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_PATIENT_APPOINTMENTS_MOBILE,
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

export function searchPatientAppointments(criteria, query, id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getFilterPatientAppointmentsApi(criteria,query, id).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_PATIENT_APPOINTMENTS,
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

export function clearPatientExams() {
    return {
        type: CLEAR_PATIENT_EXAMS,
    }
}

