import {combineReducers} from 'redux';
import agreements from './agreements.reducer';
import agreement from './agreement.reducer';


const reducer = combineReducers({
    agreements,
    agreement
});

export default reducer;
