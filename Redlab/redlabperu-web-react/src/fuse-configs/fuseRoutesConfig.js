import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {SpecialityConfig} from 'main/content/speciality/SpecialityConfig';
import {ServiceConfig} from 'main/content/services/ServiceConfig';
import {AgreementConfig} from 'main/content/agreements/AgreementConfig';
import {ReferenceValueConfig} from 'main/content/referenceValues/ReferenceValueConfig';
import {PatientConfig} from 'main/content/patients/PatientConfig';
import {PatientExamConfig} from 'main/content/patientExamination/PatientExamConfig';
import {EmployeeConfig} from 'main/content/employees/EmployeeConfig';
import {ExaminationConfig} from 'main/content/examinations/ExaminationConfig';
import {AppointmentConfig} from 'main/content/appointments/AppointmentConfig';
import {ResultConfig} from 'main/content/results/ResultConfig';
import {Error404PageConfig} from 'main/content/pageError/404/Error404PageConfig';
import {LoginConfig} from 'main/content/login/LoginConfig';
import {RegisterConfig} from 'main/content/register/RegisterConfig';
import {ForgotConfig} from 'main/content/forgotPassword/ForgotConfig';
import {ResetConfig} from 'main/content/resetPassword/ResetConfig';
import {ReportExamMonthlyConfig} from 'main/content/reportExamMonthly/ReportExamMonthlyConfig';
import {LogoutConfig} from 'main/content/logout/LogoutConfig';
import {ProfilePageConfig} from 'main/content/profile/ProfilePageConfig';
import {HomePageConfig} from 'main/content/home/HomePageConfig';
import {KnowledgeBasePageConfig} from "../main/content/knowledge-base/KnowledgeBaseConfig";
import _ from '@lodash';
import {authRoles} from 'auth';

function setAdminAuth(configs)
{
    return configs.map(config => _.merge({}, config, {auth: authRoles.admin}))
}
 
function setPatienAuth(configs)
{
    return configs.map(config => _.merge({}, config, {auth: authRoles.patient}))
}

const routeConfigs = [
    ...setAdminAuth([
        SpecialityConfig,
        ServiceConfig,
        AgreementConfig,
        PatientConfig,
        ExaminationConfig,
        EmployeeConfig,
        AppointmentConfig,
        ReferenceValueConfig,
        ResultConfig,
        ReportExamMonthlyConfig
    ]),
    ...setPatienAuth([
        HomePageConfig,
        ProfilePageConfig,
        PatientExamConfig
    ]),
    Error404PageConfig,
    LogoutConfig,
    LoginConfig,
    RegisterConfig,
    ForgotConfig,
    ResetConfig,
    KnowledgeBasePageConfig
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {   path: '/',
        exact: true,
        component: () => <Redirect to="/logout"/>
    },
    {
        path:'*',
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];
