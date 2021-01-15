import * as Actions from '../actions';

const initialState = {
    data: {},
    openDialog: false
};

const employeeReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EMPLOYEE:
        {
            return {
                ...state,
                openDialog: false,
                data: action.payload
            };
        }
        case Actions.SAVE_EMPLOYEE:
        {
            return {
                ...state,
                openDialog: false,
                data: action.payload
            };
        }
        case Actions.CLOSE_DIALOG:
        {
            return {
                ...state,
                openDialog: false
            };
        }
        default:
        {
            return state;
        }
    }
}

export default employeeReducer
