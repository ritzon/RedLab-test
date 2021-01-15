import {FuseLoadable} from '@fuse';

export const HomePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/home',
            component: FuseLoadable({
                loader: () => import('./Home')
            })
        },
        {
            path     : '/apps/headquarters',
            component: FuseLoadable({
                loader: () => import('./Headquarters')
            })
        },
    ]
};
