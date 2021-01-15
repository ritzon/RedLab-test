import { getReferenceValuesApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_REFERENCE_VALUES = 'GET REFERENCE VALUES';
export const CLEAR_REFERENCE_VALUES = 'CLEAR REFERENCE VALUES';
export const GET_REFERENCE_VALUES_MOBILE = 'GET REFERENCE VALUES MOBILE';
export const SET_REFERENCE_VALUES_SEARCH_TEXT = 'SET REFERENCE VALUES SEARCH TEXT';

export function getReferenceValues(start, end)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getReferenceValuesApi(start,end).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_REFERENCE_VALUES,
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

export function getReferenceValuesMobile(start, end)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getReferenceValuesApi(start,end).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_REFERENCE_VALUES_MOBILE,
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

export function setReferenceValuesSearchText(event)
{
    return {
        type      : SET_REFERENCE_VALUES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function clearReferenceValues()
{
    return {
        type: CLEAR_REFERENCE_VALUES,
    }
}
