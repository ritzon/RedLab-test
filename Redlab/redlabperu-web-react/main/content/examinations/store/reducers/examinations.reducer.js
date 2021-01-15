import * as Actions from '../actions';

const initialState = {
    total       : 0,
    data      : [],
    searchText: ''
};

const examinationsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EXAMINATIONS:
        {
            return {
                ...state,
                total: action.payload.total,
                data: action.payload.data
            };
        }
        case Actions.GET_EXAMINATIONS_MOBILE:
        {
            return {
                ...state,
                total: action.payload.total,
                data: [...state.data,...action.payload.data]
            };
        }
        case Actions.SET_EXAMINATIONS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLEAR_EXAMINATIONS:
        {
            return {
                ...initialState
            };
        }
        case Actions.DELETE_EXAMINATION:
        {
            let data = [...state.data]
            data = data.filter(i => i.id !== action.payload)
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

export default examinationsReducer;
