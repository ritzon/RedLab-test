import * as Actions from '../actions';


const initialState = {
    user:{},
    openDialog: false
    
};

const editUserReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.EDIT_USER:
        {
            return {
                ...state,
                openDialog: true,
                user: action.payload
            };
        } 
        default:
        {
            return state;
        }
    }
}

export default editUserReducer