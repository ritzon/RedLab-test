import {combineReducers} from 'redux';
import patientExams from './patientExams.reducer';
import patientExam from './patientExam.reducer';


const reducer = combineReducers({
    patientExams,
    patientExam
});

export default reducer;
