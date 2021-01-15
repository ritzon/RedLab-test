import * as Actions from '../actions';

const initialState = {
    data: [],
    openDialog: false
};

const serviceReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SERVICE:
        {
            return {
                ...state,
                openDialog: false,
                data: action.payload
            };
        }
        case Actions.SAVE_SERVICE:
        {
            return {
                ...state,
                openDialog: false,
                data: action.payload
            };
        }
        case Actions.CAN_SAVE:
        {
            return {
                ...state,
                data: action.payload,
                openDialog: true
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

export default serviceReducer

