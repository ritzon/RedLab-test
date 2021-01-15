import {FuseLoadable} from '@fuse';

export const PatientConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/patients/:patientId/:patientHandle?',
            component: FuseLoadable({
                loader: () => import('./Patient')
            })
        },
        {
            path     : '/apps/patients',
            component: FuseLoadable({
                loader: () => import('./Patients')
            })
        },
        
    ]
};
