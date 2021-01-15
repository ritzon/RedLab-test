import * as Actions from '../../actions/fuse/index';

const initialState = {
    loading: 0
};

const request = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.FETCH_START:
        {
            return {
                loading: state.loading + 1
            }
        }
        case Actions.FETCH_END:
        {
            return {
                loading: state.loading - 1
            }
        }

        default:
        {
            return state;
        }
    }
};

export default request;