import {combineReducers} from 'redux';
import examinations from './examinations.reducer';
import examination from './examination.reducer';


const reducer = combineReducers({
    examinations,
    examination
});

export default reducer;
