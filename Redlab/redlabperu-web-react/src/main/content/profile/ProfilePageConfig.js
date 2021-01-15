import {FuseLoadable} from '@fuse';

export const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/pages/profile',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        },
        {
            path     : '/pages/changePassword',
            component: FuseLoadable({
                loader: () => import('./ChangePasswordPage')
            })
        }
    ]
};
