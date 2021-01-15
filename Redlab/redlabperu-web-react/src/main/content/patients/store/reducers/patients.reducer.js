import * as Actions from '../actions';

const initialState = {
    total       : 0,
    data      : [],
    searchText: ''
};

const patientsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PATIENTS:
        {
            return {
                ...state,
                total: action.payload.total,
                data: action.payload.data
            };
        }
        case Actions.GET_PATIENTS_MOBILE:
        {
            return {
                ...state,
                total: action.payload.total,
                data: [...state.data,...action.payload.data]
            };
        }
        case Actions.SET_PATIENTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLEAR_PATIENTS:
        {
            return {
                ...initialState
            };
        }
        case Actions.DELETE_PATIENT:
        {
            let data = [...state.data]
            data = data.filter(i => i.user.id !== action.payload)
            console.log(data)
            return {
                ...state,
                total: state.total - 1,
                data
            };
        }
        default:
        {
            return state;
        }
    }
};

export default patientsReducer;
