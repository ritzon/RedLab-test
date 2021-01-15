import {FuseLoadable} from '@fuse';

export const ServiceConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/services/:serviceId/:serviceHandle?',
            component: FuseLoadable({
                loader: () => import('./Service')
            })
        },
        {
            path     : '/apps/services',
            component: FuseLoadable({
                loader: () => import('./Services')
            })
        },
        
    ]
};
