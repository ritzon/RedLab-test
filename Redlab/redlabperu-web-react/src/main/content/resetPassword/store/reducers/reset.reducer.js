import * as Actions from '../actions';

const initialState = {
    data: [],
    user:[],
    pass:[],
    openDialog: false
};

const ResetReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_USER:
        {
            return {
                ...state,
                user: action.payload
            };
        }
        case Actions.SET_USER:
        {
            return {
                ...state,
                user: action.payload
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

export default ResetReducer
