import * as Actions from '../actions';

const initialState = {
    total       : 0,
    data      : [],
    searchText: ''
};

const employeesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EMPLOYEES:
        {
            return {
                ...state,
                total: action.payload.total,
                data: action.payload.data
            };
        }
        case Actions.GET_EMPLOYEES_MOBILE:
        {
            return {
                ...state,
                total: action.payload.total,
                data: [...state.data,...action.payload.data]
            };
        }
        case Actions.SET_EMPLOYEES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLEAR_EMPLOYEES:
        {
            return {
                ...initialState
            };
        }
        case Actions.DELETE_EMPLOYEE:
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

export default employeesReducer;
