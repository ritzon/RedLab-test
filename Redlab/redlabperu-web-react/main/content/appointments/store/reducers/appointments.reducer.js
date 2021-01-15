import * as Actions from '../actions';

const initialState = {
    data      : [],
    total     : 0,
    searchText: ''
};

const appointmentsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_APPOINTMENTS:
        {
            return {
                ...state,
                total: action.payload.total,
                data: action.payload.data
            };
        }
        case Actions.GET_APPOINTMENTS_MOBILE:
        {
            return {
                ...state,
                total: action.payload.total,
                data: [...state.data,...action.payload.data]
            };
        }
        case Actions.SET_APPOINTMENTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLEAR_APPOINTMENTS:
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

export default appointmentsReducer;
