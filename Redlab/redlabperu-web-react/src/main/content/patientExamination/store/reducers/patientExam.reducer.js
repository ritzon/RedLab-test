import * as Actions from '../actions';

const initialState = {
    data: [],
    openDialog: false
};

const patientExamReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PATIENT_EXAM:
        {
            return {
                ...state,
                openDialog: false,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
}

export default patientExamReducer
