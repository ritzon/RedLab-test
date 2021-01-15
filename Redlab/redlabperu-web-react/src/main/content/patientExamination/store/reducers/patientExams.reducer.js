import * as Actions from '../actions';

const initialState = {
    total       : 0,
    data      : [],
    searchText: ''
};

const patientExamsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PATIENT_APPOINTMENTS:
        {
            return {
                ...state,
                total: action.payload.total,
                data: action.payload.data
            };
        }
        case Actions.GET_PATIENT_APPOINTMENTS_MOBILE:
        {
            return {
                ...state,
                total: action.payload.total,
                data: [...state.data,...action.payload.data]
            };
        }
        case Actions.CLEAR_PATIENT_EXAMS:
        {
            return {
                ...initialState
            };
        }
        default:
        {
            return state;
        }
    }
};

export default patientExamsReducer;
