import {combineReducers} from 'redux';
import services from './services.reducer';
import service from './service.reducer';


const reducer = combineReducers({
    services,
    service
});

export default reducer;
