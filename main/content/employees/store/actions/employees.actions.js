import { getPagedEmployeesApi, getFilterEmployeesApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_EMPLOYEES = 'GET EMPLOYEES';
export const CLEAR_EMPLOYEES = 'CLEAR EMPLOYEES';
export const GET_EMPLOYEES_MOBILE = 'GET EMPLOYEES MOBILE';
export const SET_EMPLOYEES_SEARCH_TEXT = 'SET EMPLOYEES SEARCH TEXT';

export function getEmployees(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getPagedEmployeesApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_EMPLOYEES,
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

export function getEmployeesAll(userId) {
    // return (dispatch) =>{
    //     dispatch(fetch_start())
    //     getEmployeesAllApi(userId).then(response => {
    //         console.log(response)
    //         if (response.status){
    //             dispatch({
    //                 type: GET_EMPLOYEES,
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

export function getEmployeesMobile(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getPagedEmployeesApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_EMPLOYEES_MOBILE,
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

export function searchEmployees(criteria, query) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getFilterEmployeesApi(criteria, query).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_EMPLOYEES,
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

export function clearEmployees() {
    return {
        type: CLEAR_EMPLOYEES,
    }
}
