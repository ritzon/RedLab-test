import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import { getMenuUserApi } from '../../../api';

export const GET_NAVIGATION = '[NAVIGATION] GET NAVIGATION';
export const SET_NAVIGATION = '[NAVIGATION] SET NAVIGATION';
export const RESET_NAVIGATION = '[NAVIGATION] RESET NAVIGATION';

export function getNavigation(userId)
{
    return (dispatch) => {
        dispatch(fetch_start())
        getMenuUserApi(userId).then(response => {
            if (response.status) {
                dispatch(setNavigation(response.data));
                localStorage.setItem('navigation', JSON.stringify(response.data));
            }
        },err => {
            console.log(err)
            dispatch(showMessage({message: err.message.text, variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
}

export function getNavigationState()
{
    return {
        type: GET_NAVIGATION
    }
}

export function setNavigation(navigation)
{
    return {
        type: SET_NAVIGATION,
        navigation
    }
}

export function resetNavigation()
{
    return {
        type: RESET_NAVIGATION
    }
}
