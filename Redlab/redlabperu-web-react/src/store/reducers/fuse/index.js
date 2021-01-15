import {combineReducers} from 'redux';
import navigation from './navigation.reducer';
import menulink from './menulink.reducer';
import settings from './settings.reducer';
import navbar from './navbar.reducer';
import message from './message.reducer';
import request from './request.reducer';


const fuseReducers = combineReducers({
    navigation,
    menulink,
    settings,
    navbar,
    message,
    request
});

export default fuseReducers;