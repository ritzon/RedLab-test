import * as Actions from '../actions';

const initialState = {
    data: {},
    openDialog: false
};

const examinationReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EXAMINATION:
        {
            return {
                ...state,
                openDialog: false,
                data: action.payload
            };
        }
        case Actions.SAVE_EXAMINATION:
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

export default examinationReducer
