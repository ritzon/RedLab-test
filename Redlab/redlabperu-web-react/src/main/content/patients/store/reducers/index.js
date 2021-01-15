import {combineReducers} from 'redux';
import patients from './patients.reducer';
import patient from './patient.reducer';


const reducer = combineReducers({
    patients,
    patient
});

export default reducer;
