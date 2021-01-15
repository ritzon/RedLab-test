import firebaseService from 'firebaseService';
import {setUserData} from 'auth/store/actions/user.actions';
import {getNavigation} from 'store/actions/fuse/navigation.actions';
import { showMessage, fetch_start, fetch_end } from 'store/actions/fuse';
import { loginApi } from '../../../api';
import * as Actions from 'store/actions';
import history from 'history.js';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin(credentials)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        loginApi(credentials).then(response => {
            console.log(response)
            if(response.status){
                localStorage.setItem('user_id',response.data.user.id)
                localStorage.setItem('accessToken',response.data.accessToken)
                localStorage.setItem('user',JSON.stringify(response.data.user))
                localStorage.setItem('headquarterImg', response.data.person.headquarter.urlImage)
                localStorage.setItem('roles',JSON.stringify(response.data.roles))
                localStorage.setItem('person',JSON.stringify(response.data.person))
                localStorage.setItem('credentials',JSON.stringify(credentials))
                dispatch(setUserData(response.data));
                dispatch(getNavigation(response.data.user.id));
                dispatch({type:LOGIN_SUCCESS})
                history.push({
                    pathname: '/apps/home'
                });
            }
            else{
                dispatch(showMessage({message: response.message.text, variant:"error"}))
            }
        },err => {
            console.log(err)
            dispatch(showMessage({message: err.message, variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
}

export function submitLoginAutomatic(credentials,path)
{
    return (dispatch) =>
    loginApi(credentials).then(response => {
        console.log(response)
        if(response.status){
            localStorage.setItem('user_id',response.data.user.id)
            localStorage.setItem('accessToken',response.data.accessToken)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            localStorage.setItem('headquarterImg', response.data.person.headquarter.urlImage)
            localStorage.setItem('roles',JSON.stringify(response.data.roles))
            localStorage.setItem('person',JSON.stringify(response.data.person))
            localStorage.setItem('credentials',JSON.stringify(credentials))
            dispatch(setUserData(response.data));
            dispatch(getNavigation(response.data.user.id));
            dispatch({type:LOGIN_SUCCESS})
            /*
            history.push({
                pathname: path
            });
            */
        }else{
            history.push({
                pathname: '/logout'
            });
        }
     },err=>{
         console.log(err)
     })        
}


export function loginWithFireBase({username, password})
{
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];
                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    username: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response
                });
            });
}
