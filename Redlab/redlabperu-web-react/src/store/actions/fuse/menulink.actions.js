export const SET_FUNCTION = 'SET FUNCTION';
export const GET_FUNCTION = 'GET FUNCTION';
export const RESET_FUNCTION = 'RESET FUNCTION';

export function setFunction(item)
{	
    return {
        type: SET_FUNCTION,
        item
    }
}

export function getFunction()
{
    return {
        type: GET_FUNCTION
    }
}

export function resetFunction()
{
    return {
        type: RESET_FUNCTION
    }
}