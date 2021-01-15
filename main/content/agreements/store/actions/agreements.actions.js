import { getAgreementsApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_AGREEMENTS = 'GET AGREEMENTS';
export const CLEAR_AGREEMENTS = 'CLEAR AGREEMENTS';
export const GET_AGREEMENTS_MOBILE = 'GET AGREEMENTS MOBILE';
export const SET_CARDS_SEARCH_TEXT = 'SET CARDS SEARCH TEXT';

export function getAgreements(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getAgreementsApi(start, end).then(response => {
            console.log("RESPONDE: ",response)
            if (response.status){
                dispatch({
                    type: GET_AGREEMENTS,
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

export function getAgreementsMobile(start, end) {
    return (dispatch) =>{
        dispatch(fetch_start())
        getAgreementsApi(start, end).then(response => {
            console.log(response)
            if (response.status){
                dispatch({
                    type: GET_AGREEMENTS_MOBILE,
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

export function clearAgreements() {
    return {
        type: CLEAR_AGREEMENTS,
    }
}
