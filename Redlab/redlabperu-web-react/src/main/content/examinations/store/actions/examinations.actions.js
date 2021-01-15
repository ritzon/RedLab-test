import { getPagedExaminationsApi, getFilterExamApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_EXAMINATIONS = 'GET EXAMINATIONS';
export const CLEAR_EXAMINATIONS = 'CLEAR EXAMINATIONS';
export const GET_EXAMINATIONS_MOBILE = 'GET EXAMINATIONS MOBILE';
export const SET_EXAMINATIONS_SEARCH_TEXT = 'SET EXAMINATIONS SEARCH TEXT';

export function getExaminations(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getPagedExaminationsApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_EXAMINATIONS,
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

export function getExaminationsAll(userId) {
    // return (dispatch) =>{
    //     dispatch(fetch_start())
    //     getExaminationsAllApi(userId).then(response => {
    //         console.log(response)
    //         if (response.status){
    //             dispatch({
    //                 type: GET_EXAMINATIONS,
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

export function getExaminationsMobile(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getPagedExaminationsApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_EXAMINATIONS_MOBILE,
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

export function searchExaminations(query) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getFilterExamApi(query).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_EXAMINATIONS,
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

export function clearExaminations() {
    return {
        type: CLEAR_EXAMINATIONS,
    }
}
