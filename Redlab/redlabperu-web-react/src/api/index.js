import { apiFetch } from './apiFetch'

const PORT_BACKEND = process.env.REACT_APP_PORT_BACKEND || '8080';
const URL_BACKEND = process.env.REACT_APP_API_URL_BACKEND || 'http://localhost';
export const API_URL_BACKEND = `${URL_BACKEND}:${PORT_BACKEND}/api/`

export const getPassword = (email) => apiFetch(`user/forgot/password`,{method:'POST',body:email})
export const getConfirmToken= (userId, token) => apiFetch(`user/valid/token/${userId}/${token}`);
export const saveUserApi =(user) => apiFetch(`user`,{method:'POST',body:user})
export const changeApiPassword = (id, pass) => apiFetch(`user/${id}`, {method: 'PUT', body: pass});
export const resetApiPassword= (id, pass) => apiFetch(`user/reset/password`,{method:'PUT',body:{userId: id, newPassword: pass.password}});


export const editUserApi = (user,userId, person) => {
	if (person === 'client')
		return apiFetch(`${person}/${userId}`,{method: 'PUT',body:user})
	else
		return apiFetch(`${person}/${userId}`,{method: 'PUT',body:user, headers: {}})
}

export const deleteCardApi = (cardId, userId) => apiFetch(`card/${userId}/${cardId}`,{method:'DELETE'})
export const loginApi =({email,password}) => apiFetch(`login`,{headers : {
    'Content-Type': 'application/json',
    'Authorization': 'Basic '+ btoa(`${email}:${password}`),
  }})


//Paged services
export const getPagedEmployeesApi = (start,end) => apiFetch(`employee?range=[${start},${end}]`)
export const getPagedTuitionsApi = () => apiFetch(`tuition`)
export const getPagedSpecialitiesApi = () => apiFetch(`speciality`)
export const getPagedTypeEmployeesApi = () => apiFetch(`typeEmployee`)
export const getCategoriesApi = () => apiFetch(`category`)
export const getPagedTypeDocsApi = () => apiFetch(`typeDoc`)

//Get all for combo
export const getTuitionsApi = () => apiFetch(`tuition/all`)
export const getAgreementsAllApi = () => apiFetch(`agreement/all`)
export const getSpecialitiesApi = () => apiFetch(`speciality/all`)
export const getTypeEmployeesApi = () => apiFetch(`typeEmployee/all`)
export const getTypeDocsApi = () => apiFetch(`typeDoc/all`)
export const getRolesApi = () => apiFetch(`role/all`)
export const getRegionsApi = () => apiFetch(`region`)
export const getProvincesForRegion = (regionId) => apiFetch(`region/province/${regionId}`)
export const getDistrictsForProvince = (provinceId) => apiFetch(`province/district/${provinceId}`)
export const getEmployeesByType = (typeEmployeeId) => apiFetch(`employee/type/${typeEmployeeId}`)
export const getServicesAllApi = () => apiFetch(`service/all`)
export const getMethodsAllApi = () => apiFetch(`method/all`)
export const getReferenceValuesAllApi = () => apiFetch(`referenceValue/all`)
export const getHeadquartersAllApi = () => apiFetch(`headquarter/all`)
export const getTypeAgreementsAllApi = () => apiFetch(`typeAgreement/all`)
export const getExaminationsAllApi = () => apiFetch(`examination/all`)
export const getProfessionsAllApi = () => apiFetch(`profession/all`)
export const getEmployeesAllApi = (criteria, query) => apiFetch(`employee/all?${criteria}=${query}`)

// Get for search query
export const getFilterExamApi = (query, service = "") => apiFetch(`examination/filter?string=${query}&service=${service}`)
export const getFilterEmployeesApi = (criteria, query) => apiFetch(`employee?${criteria}=${query}`)
export const getFilterPatientsApi = (criteria, query) => apiFetch(`client?${criteria}=${query}`)
export const getFilterAppointmentsApi = (criteria,query, status) => apiFetch(`appointment?${criteria}=${query}&status=${status}`);
export const getFilterPatientAppointmentsApi = (criteria,query, id) => apiFetch(`appointment?${criteria}=${query}&UserId=${id}`);

export const getEmployeeApi = (id) => apiFetch(`employee/${id}`);
export const saveEmployeeApi = (data) => apiFetch(`user/employee`, {method: 'POST', body: data, headers: {}});
export const editEmployeeApi = (data, userId) => apiFetch(`employee/${userId}`, {method: 'PUT', body: data, headers: {}});
export const deleteEmployeeApi = (userId) => apiFetch(`employee/${userId}`, {method: 'DELETE'});

export const getAgreementsApi = (start, end) => apiFetch(`agreement?range=[${start},${end}]`);
export const getAgreementApi = (id) => apiFetch(`agreement/${id}`);
export const saveAgreementApi = (data) => apiFetch(`agreement/`, {method: 'POST', body: data});
export const editAgreementApi = (data, id) => apiFetch(`agreement/${id}`, {method: 'PUT', body: data});
export const deleteAgreementApi = (id) => apiFetch(`agreement/${id}`, {method: 'DELETE'});

// Agremeents prices list
export const getAgreementsListPriceApi = (agreementId) => apiFetch(`priceList?agreementId=${agreementId}`);
export const getPriceListApi = (priceListId) => apiFetch(`priceList/${priceListId}`);
export const savePriceListApi = (data) => apiFetch(`priceList/`, {method: 'POST', body: data});
export const editPriceListApi = (id, data) => apiFetch(`priceList/${id}`, {method: 'PUT', body: data});
export const deletePriceListApi = (id) => apiFetch(`priceList/${id}`, {method: 'DELETE'});

export const getSpecialtiesApi = (start, end) => apiFetch(`speciality?range=[${start},${end}]`);
export const getSpecialityApi = (id) => apiFetch(`speciality/${id}`);
export const saveSpecialityApi = (data) => apiFetch(`speciality/`, {method: 'POST', body: data});
export const editSpecialityApi = (data, id) => apiFetch(`speciality/${id}`, {method: 'PUT', body: data});
export const deleteSpecialityApi = (id) => apiFetch(`speciality/${id}`, {method: 'DELETE'});

export const getServicesApi = (start, end) => apiFetch(`service?range=[${start},${end}]`);
export const getServiceApi = (id) => apiFetch(`service/${id}`);
export const saveServiceApi = (data) => apiFetch(`service/`, {method: 'POST', body: data});
export const editServiceApi = (data, id) => apiFetch(`service/${id}`, {method: 'PUT', body: data});
export const deleteServiceApi = (id) => apiFetch(`service/${id}`, {method: 'DELETE'});

// new apis added CA
export const getMethodsApi = (start, end) => apiFetch(`method?range=[${start},${end}]`);
export const getMethodApi = (id) => apiFetch(`method/${id}`);
export const saveMethodApi = (data) => apiFetch(`method/`, {method: 'POST', body: data});
export const editMethodApi = (data, id) => apiFetch(`method/${id}`, {method: 'PUT', body: data});
export const deleteMethodApi = (id) => apiFetch(`method/${id}`, {method: 'DELETE'});


export const getPatientApi = (id) => apiFetch(`client/${id}`);
export const getPagedPatientsApi = (start, end) => apiFetch(`client?range=[${start},${end}]`);
export const getPatienByDOCApi = (criteria, doc) => apiFetch(`client/doc/search?${criteria}=${doc}`);
export const savePatientApi = (data) => apiFetch(`user/client`, {method: 'POST', body: data});
export const editPatientApi = (data, userId) => apiFetch(`client/${userId}`, {method: 'PUT', body: data});
export const deletePatientApi = (userId) => apiFetch(`client/${userId}`, {method: 'DELETE'});

export const getAppointmentsApi = (start, end, status, date) => apiFetch(`appointment?range=[${start},${end}]&status=${status}&date=${date}`);
export const getAppointmentsPatientApi = (start, end, id) => apiFetch(`appointment?range=[${start},${end}]&UserId=${id}`);
export const getAppointmentsResultsApi = (appointmentId) => apiFetch(`appointment/result/${appointmentId}`);
export const getAppointmentApi = (id) => apiFetch(`appointment/${id}`);
export const saveAppointmentApi = (data) => apiFetch(`appointment/`, {method: 'POST', body: data});
export const attendAppointmentApi = (data, id) => apiFetch(`appointment/attend/${id}`, {method: 'PUT', body: data});
export const editAppointmentApi = (data, id) => apiFetch(`appointment/${id}`, {method: 'PUT', body: data});
export const deleteAppointmentApi = (id) => apiFetch(`appointment/${id}`, {method: 'DELETE'});

export const getPagedExaminationsApi = (start, end) => apiFetch(`examination?range=[${start},${end}]`);
export const getExaminationApi = (id) => apiFetch(`examination/${id}`);
export const saveExaminationApi = (data) => apiFetch(`examination/`, {method: 'POST', body: data});
export const editExaminationApi = (data, id) => apiFetch(`examination/${id}`, {method: 'PUT', body: data});
export const deleteExaminationApi = (id) => apiFetch(`examination/${id}`, {method: 'DELETE'});

export const getReferenceValuesApi = (start, end) => apiFetch(`referenceValue?range=[${start},${end}]`);
export const getReferenceValueApi = (id) => apiFetch(`referenceValue/${id}`);
export const saveReferenceValueApi = (data) => apiFetch(`referenceValue/`, {method: 'POST', body: data});
export const editReferenceValueApi = (data, id) => apiFetch(`referenceValue/${id}`, {method: 'PUT', body: data});
export const deleteReferenceValueApi = (id) => apiFetch(`referenceValue/${id}`, {method: 'DELETE'});

export const saveTypeEmployeeApi = (data) => apiFetch(`typeEmployee`, {method: 'POST', body: data});
export const saveTuitionApi = (data) => apiFetch(`tuition`, {method: 'POST', body: data});
export const saveProfessionApi = (data) => apiFetch(`profession`, {method: 'POST', body: data});

export const getMenuUserApi = (userId) => apiFetch(`user/menu/${userId}`);

export const editHeadquarterApi = (id, data) => apiFetch(`headquarter/${id}`, {method: 'PUT', body: data, headers:{}})
export const saveHeadquarterApi = (data) => apiFetch(`headquarter/`, {method: 'POST', body: data, headers: {}})
export const getHeadquarterApi = (id) => apiFetch(`headquarter/${id}`)

export const reportExamMonthly = (month, year, AgreementId, HeadquarterId) => apiFetch(`report/appointments?month=${month}&year=${year}&AgreementId=${AgreementId}&HeadquarterId=${HeadquarterId}`)
export const reportPdfResult = (appointmentId) => apiFetch(`report/result/${appointmentId}`)
