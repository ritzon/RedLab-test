import {FuseLoadable} from '@fuse';

export const ExaminationConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/examinations/:examinationId/:examinationHandle?',
            component: FuseLoadable({
                loader: () => import('./Examination')
            })
        },
        {
            path     : '/apps/examinations',
            component: FuseLoadable({
                loader: () => import('./Examinations')
            })
        },
        
    ]
};
