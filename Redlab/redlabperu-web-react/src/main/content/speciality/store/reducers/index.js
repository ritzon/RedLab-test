import {combineReducers} from 'redux';
import specialties from './specialties.reducer';
import speciality from './speciality.reducer';


const reducer = combineReducers({
    specialties,
    speciality
});

export default reducer;
