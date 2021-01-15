import {FuseLoadable} from '@fuse';

export const AppointmentConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/appointments/:appointmentId/:appointmentHandle?',
            component: FuseLoadable({
                loader: () => import('./Appointment')
            })
        },
        {
            path     : '/apps/appointments',
            component: FuseLoadable({
                loader: () => import('./Appointments')
            })
        },
    ]
};
