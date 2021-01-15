import {combineReducers} from 'redux';
import employees from './employees.reducer';
import employee from './employee.reducer';


const reducer = combineReducers({
    employees,
    employee
});

export default reducer;
