import * as Actions from '../actions';

const initialState = {
    total       : 0,
    data      : [],
    searchText: ''
};

const agreementsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_AGREEMENTS:
        {
            return {
                ...state,
                total: action.payload.total,
                data: action.payload.data
            };
        }
        case Actions.GET_AGREEMENTS_MOBILE:
        {
            return {
                ...state,
                total: action.payload.total,
                data: [...state.data,...action.payload.data]
            };
        }
        case Actions.SET_CARDS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.CLEAR_AGREEMENTS:
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

export default agreementsReducer;
