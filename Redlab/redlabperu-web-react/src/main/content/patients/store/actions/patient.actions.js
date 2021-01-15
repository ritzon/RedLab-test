import {showMessage, fetch_start, fetch_end} from 'store/actions/fuse';
import { savePatientApi, editPatientApi, deletePatientApi, getPatientApi } from '../../../../../api';
import history from 'history.js';

export const GET_PATIENT = 'GET PATIENT';
export const SAVE_PATIENT = 'SAVE PATIENT';
export const CLOSE_DIALOG = 'CLOSE DIALOG';
export const DELETE_PATIENT = 'DELETE PATIENT';

export function deletePatient(userId)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        deletePatientApi(userId).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                dispatch({
                    type   : DELETE_PATIENT,
                    payload: userId
                })
            }
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
}

export function setPatient(patient)
{
    return {
        type   : GET_PATIENT,
        payload: preparePatientForEdit(patient)
    }
     
}

export function getPatient(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getPatientApi(id).then(response => {
            if(response.status){
                dispatch({
                    type: GET_PATIENT,
                    payload: preparePatientForEdit(response.data)
                })
            }
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
     
}

export function savePatient(patient, url = null)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        savePatientApi(patient).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                if (url)
                    history.push({pathname: url})
                else
                    history.push({pathname: '/apps/patients'});
            }
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
}

export function editPatient(patient, userId)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editPatientApi(patient, userId).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/patients'
                });
            }
            else
                dispatch(showMessage({message: response.message.text, variant:"error"}))
        } 
        ,err => {
            console.log(err)
            dispatch(showMessage({message: 'Error de conexión', variant:"error"}))
        }).finally(() => dispatch(fetch_end()))
    }
}

export function closeDialog()
{
    return {
        type   : CLOSE_DIALOG,
    }
}


export function newPatient()
{
    const data = {
    	"username": "", 
    	"dni": "", 
    	"birthDate": "", 
    	"name": "", 
    	"lastNameP": "", 
    	"lastNameM": "", 
    	"gender": "", 
    	"phoneNumber": "", 
    	"tlfNumber": "", 
    	"address": "", 
    	"civilStatus": "",
    	"TypeDocId": "", 
    	"DistrictId": "",
    	"ProvinceId": "",
    	"RegionId": "",
    	"nationality": "",
    	"historyNumber": ""
    };

    return {
        type   : GET_PATIENT,
        payload: data
    }
}

const preparePatientForEdit = (patient) => ({
    "userId" : patient.user.id, 
    "username": patient.user.username, 
    "dni": patient.typeDoc.dni, 
    "birthDate": patient.person.birthDateUS, 
    "name": patient.person.name, 
    "lastNameP": patient.person.lastNameP, 
    "lastNameM": patient.person.lastNameM, 
    "gender": patient.person.gender, 
    "phoneNumber": patient.person.phoneNumber, 
    "tlfNumber": patient.person.tlfNumber, 
    "address": patient.person.address, 
    "TypeDocId": patient.typeDoc.id, 
    "civilStatus": patient.person.civilStatus,
    "roles": patient.rolesId,
    "RegionId": patient.region,
    "ProvinceId": patient.province,
    "DistrictId": patient.district,
    "nationality": patient.person.nationality,
    "historyNumber" : patient.person.historyNumber,
})
