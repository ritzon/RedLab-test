import {showMessage, fetch_start, fetch_end} from 'store/actions/fuse';
import { saveEmployeeApi, editEmployeeApi, deleteEmployeeApi, getEmployeeApi } from '../../../../../api';
import history from 'history.js';

export const GET_EMPLOYEE = 'GET EMPLOYEE';
export const SAVE_EMPLOYEE = 'SAVE EMPLOYEE';
export const CLOSE_DIALOG = 'CLOSE DIALOG';
export const DELETE_EMPLOYEE = 'DELETE EMPLOYEE';

export function deleteEmployee(userId)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        deleteEmployeeApi(userId).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                dispatch({
                    type   : DELETE_EMPLOYEE,
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

export function setEmployee(employee)
{
    return {
        type   : GET_EMPLOYEE,
        payload: prepareEmployeForEdit(employee)
    }
     
}

export function getEmployee(id)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        getEmployeeApi(id).then(response => {
            if(response.status){
                dispatch({
                    type: GET_EMPLOYEE,
                    payload: prepareEmployeForEdit(response.data)
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

export function saveEmployee(employee)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        saveEmployeeApi(employee).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/employees'
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

export function editEmployee(employee, userId)
{
    return (dispatch) =>{
        dispatch(fetch_start())
        editEmployeeApi(employee, userId).then(response => {
            if(response.status){
                dispatch(showMessage({message: response.message.text, variant:"success"}))
                history.push({
                    pathname: '/apps/employees'
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


export function newEmployee()
{
    const data = {
    	"username": "", 
    	"dni": "", 
    	"admissionDate": "", 
    	"birthDate": "", 
    	"name": "", 
    	"lastNameP": "", 
    	"lastNameM": "", 
    	"gender": "", 
    	"phoneNumber": "", 
    	"tlfNumber": "", 
    	"tuitionNumber": "", 
    	"tuitionNumber2": "", 
    	"address": "", 
    	//"profession": "",
    	"ProfessionId": "",
    	"civilStatus": "",
    	"TypeDocId": "", 
    	"TuitionId": "", 
    	"Tuition2Id": "", 
    	"SpecialityId": "", 
    	//"CategoryId": "", 
    	"TypeEmployeeId": "", 
    	"DistrictId": "",
    	"ProvinceId": "",
    	"RegionId": "",
    	"HeadquarterId": "",
    	"typeDirection": "",
    	"referencePoint": "",
    	//"roles": [],
    	"roles": "",
    };

    return {
        type   : GET_EMPLOYEE,
        payload: data
    }
}

const prepareEmployeForEdit = (employee) => ({
    "userId" : employee.user.id, 
	"username": employee.user.username, 
	"dni": employee.typeDoc.dni, 
	"admissionDate": employee.person.admissionDateUS, 
	"birthDate": employee.person.birthDateUS, 
	"name": employee.person.name, 
	"lastNameP": employee.person.lastNameP, 
	"lastNameM": employee.person.lastNameM, 
	"gender": employee.person.gender, 
	"phoneNumber": employee.person.phoneNumber, 
	"tlfNumber": employee.person.tlfNumber, 
	"tuitionNumber": employee.tuition.tuitionNumber, 
	"tuitionNumber2": employee.tuition2.tuitionNumber || '', 
	"address": employee.person.address, 
	//"profession": employee.person.profession, 
	"ProfessionId": employee.profession.id, 
	"typeDirection": employee.person.typeDirection,
	"referencePoint": employee.person.referencePoint,
	"TypeDocId": employee.typeDoc.id, 
	"TuitionId": employee.tuition.id, 
	"Tuition2Id": employee.tuition2.id || '',
	"SpecialityId": employee.speciality.id, 
	"civilStatus": employee.person.civilStatus,
	"TypeEmployeeId": employee.typeEmployee.id, 
	"RegionId": employee.region,
	"ProvinceId": employee.province,
	"DistrictId": employee.district,
	"HeadquarterId": employee.headquarter.id,
	"digitalSignatureUrl": employee.person.digitalSignatureUrl,
	//"roles": employee.rolesId,
	"roles": employee.rolesId[0]
})
