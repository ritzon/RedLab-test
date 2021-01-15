import {FuseLoadable} from '@fuse';

export const ReportExamMonthlyConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/report/exam',
            component: FuseLoadable({
                loader: () => import('./ReportExamMonthly')
            })
        },
    ]
};
