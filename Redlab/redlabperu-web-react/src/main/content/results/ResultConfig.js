import {FuseLoadable} from '@fuse';

export const ResultConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/results/:appointmentId/:option',
            component: FuseLoadable({
                loader: () => import('./AttendAppointment')
            })
        },
        {
            path     : '/apps/results',
            component: FuseLoadable({
                loader: () => import('./Results')
            })
        },
    ]
};
