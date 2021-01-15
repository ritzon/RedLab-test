import {FuseLoadable} from '@fuse';

export const SpecialityConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/specialties/:specialityId/:specialityHandle?',
            component: FuseLoadable({
                loader: () => import('./Speciality')
            })
        },
        {
            path     : '/apps/specialties',
            component: FuseLoadable({
                loader: () => import('./Specialties')
            })
        },
        
    ]
};
