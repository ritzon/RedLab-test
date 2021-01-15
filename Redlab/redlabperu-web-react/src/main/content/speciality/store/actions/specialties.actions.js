import { getSpecialtiesApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_SPECIALTIES = 'GET SPECIALTIES';
export const CLEAR_SPECIALTIES = 'CLEAR SPECIALTIES';
export const GET_SPECIALTIES_MOBILE = 'GET CARDS MOBILE';
export const SET_CARDS_SEARCH_TEXT = 'SET CARDS SEARCH TEXT';

export function getSpecialties(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getSpecialtiesApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_SPECIALTIES,
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

export function getSpecialtiesMobile(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getSpecialtiesApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_SPECIALTIES_MOBILE,
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

export function setCardsSearchText(event) {
    return {
        type: SET_CARDS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function clearSpecialties() {
    return {
        type: CLEAR_SPECIALTIES,
    }
}
