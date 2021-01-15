import { getServicesApi } from '../../../../../api';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';

export const GET_SERVICES = 'GET SERVICES';
export const CLEAR_SERVICES = 'CLEAR SERVICES';
export const GET_SERVICES_MOBILE = 'GET SERVICES MOBILE';
export const SET_SERVICES_SEARCH_TEXT = 'SET SERVICES SEARCH TEXT';

export function getServices(start, end)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getServicesApi(start,end).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_SERVICES,
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

export function getServicesMobile(start, end)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getServicesApi(start,end).then(response => {
            console.log(response)
            if(response.status)
                dispatch({
                    type   : GET_SERVICES_MOBILE,
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

export function setServicesSearchText(event)
{
    return {
        type      : SET_SERVICES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function clearServices()
{
    return {
        type: CLEAR_SERVICES,
    }
}
