import {FuseLoadable} from '@fuse';

export const PatientExamConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/patientexaminations',
            component: FuseLoadable({
                loader: () => import('./PatientExaminations')
            })
        },
        
    ]
};
