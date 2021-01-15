import {showMessage, fetch_start, fetch_end} from 'store/actions/fuse';
import { saveExaminationApi, editExaminationApi, deleteExaminationApi, getExaminationApi } from '../../../../../api';
import history from 'history.js';
import {FuseUtils} from '@fuse';

export const GET_EXAMINATION = 'GET EXAMINATION';
export const SAVE_EXAMINATION = 'SAVE EXAMINATION';
export const CLOSE_DIALOG = 'CLOSE DIALOG';
export const DELETE_EXAMINATION = 'DELETE EXAMINATION';

export function deleteExamination(examinationId)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        deleteExaminationApi(examinationId).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                dispatch({
                    type   : DELETE_EXAMINATION,
                    payload: examinationId
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

export function setExamination(examination)
{
    return {
        type   : GET_EXAMINATION,
        payload: prepareExaminationForEdit(examination)
    }
     
}

export function getExamination(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getExaminationApi(id).then(response => {
            if(response.status){
                dispatch({
                    type: GET_EXAMINATION,
                    payload: prepareExaminationForEdit(response.data)
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

export function saveExamination(examination)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        saveExaminationApi(examination).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/examinations'
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

export function editExamination(examination, examinatioId)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editExaminationApi(examination, examinatioId).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/examinations'
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


export function newExamination()
{
    const data = {
    	"name": "",
    	"indications": "",
        "ServiceId": "",
        "MethodId": "",
        //"AgreementId": "",
        "typeSample": "", 
        "volume": "", 
        "supplies": "", 
        "storageTemperature": "", 
        "fastingConditions": "", 
        "runFrequency": "", 
        "processTime": "", 
        "reportTime": "",
        "referenceValues": [{ id: FuseUtils.generateGUID(), allValues:'', name: '', group:' '}]
    };

    return {
        type   : GET_EXAMINATION,
        payload: data
    }
}

const prepareExaminationForEdit = (examination) => ({
	"name": examination.name,
	"indications": examination.indications,
    "typeSample": examination.typeSample, 
    "volume": examination.volume, 
    "supplies": examination.supplies, 
    "storageTemperature": examination.storageTemperature, 
    "fastingConditions": examination.fastingConditions, 
    "runFrequency": examination.runFrequency, 
    "processTime": examination.processTime, 
    "reportTime": examination.reportTime,
	"ServiceId": examination.service.id,
	"MethodId": examination.method !== undefined ? examination.method.id : "",
    //"AgreementId": examination.agreement.id,
    "referenceValues": examination.referenceValues
})
