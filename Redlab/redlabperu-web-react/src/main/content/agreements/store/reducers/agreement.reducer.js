import * as Actions from '../actions';

const initialState = {
    data: [],
    openDialog: false
};

const agreementReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_AGREEMENT:
        {
            return {
                ...state,
                openDialog: false,
                data: action.payload
            };
        }
        case Actions.SAVE_AGREEMENT:
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

export default agreementReducer
