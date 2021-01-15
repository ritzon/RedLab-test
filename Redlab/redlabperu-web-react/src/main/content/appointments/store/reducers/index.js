import {combineReducers} from 'redux';
import appointments from './appointments.reducer';
import appointment from './appointment.reducer';


const reducer = combineReducers({
    appointments,
    appointment
});

export default reducer;
