import * as Actions from '../actions';

const initialState = {
    data: [],
    openDialog: false
};

const ForgotReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        
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

export default ForgotReducer
