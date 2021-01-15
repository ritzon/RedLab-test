import * as Actions from '../../actions/fuse/index';

const initialState = {};
 
const menulink = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FUNCTION:
        {
            return {
                ...state
            };
        }
        case Actions.SET_FUNCTION:
        {
            return {
                data: action.item
            };
        }
        case Actions.RESET_FUNCTION:
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

export default menulink;