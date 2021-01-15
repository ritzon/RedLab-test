import * as Actions from '../actions';

const initialState = {
    data      : [],
    total     : 0,
    searchText: ''
};

const referenceValuesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_REFERENCE_VALUES:
        {
            return {
                ...state,
                total: action.payload.total,
                data: action.payload.data
            };
        }
        case Actions.GET_REFERENCE_VALUES_MOBILE:
        {
            return {
                ...state,
                total: action.payload.total,
                data: [...state.data,...action.payload.data]
            };
        }
        case Actions.SET_REFERENCE_VALUES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLEAR_REFERENCE_VALUES:
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

export default referenceValuesReducer;
