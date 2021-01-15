import {FuseLoadable} from '@fuse';

export const EmployeeConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/employees/:employeeId/:employeeHandle?',
            component: FuseLoadable({
                loader: () => import('./Employee')
            })
        },
        {
            path     : '/apps/employees',
            component: FuseLoadable({
                loader: () => import('./Employees')
            })
        },
        
    ]
};
