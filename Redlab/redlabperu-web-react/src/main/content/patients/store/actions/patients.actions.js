import { getPagedPatientsApi, getFilterPatientsApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_PATIENTS = 'GET PATIENTS';
export const CLEAR_PATIENTS = 'CLEAR PATIENTS';
export const GET_PATIENTS_MOBILE = 'GET PATIENTS MOBILE';
export const SET_PATIENTS_SEARCH_TEXT = 'SET PATIENTS SEARCH TEXT';

export function getPatients(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getPagedPatientsApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_PATIENTS,
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

export function getPatientsAll(userId) {
    // return (dispatch) =>{
    //     dispatch(fetch_start())
    //     getPatientsAllApi(userId).then(response => {
    //         console.log(response)
    //         if (response.status){
    //             dispatch({
    //                 type: GET_PATIENTS,
    //                 payload: response
    //             })
    //         }
    //         else
    //             dispatch(showMessage({ message: response.message.text, variant:"error" }))
    //     }
    //     , err => {
    //         console.log(err)
    //         dispatch(showMessage({ message: 'Error de conexión', variant:"error" }))
    //     }).finally(() => dispatch(fetch_end()))
    // }
}

export function getPatientsMobile(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getPagedPatientsApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_PATIENTS_MOBILE,
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

export function searchPatients(criteria, query) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getFilterPatientsApi(criteria, query).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_PATIENTS,
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

export function clearPatients() {
    return {
        type: CLEAR_PATIENTS,
    }
}
