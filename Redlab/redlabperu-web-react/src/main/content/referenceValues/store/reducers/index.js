import {combineReducers} from 'redux';
import referenceValues from './referenceValues.reducer';
import referenceValue from './referenceValue.reducer';


const reducer = combineReducers({
    referenceValues,
    referenceValue
});

export default reducer;
