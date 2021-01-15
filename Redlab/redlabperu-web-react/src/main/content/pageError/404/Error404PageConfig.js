import {FuseLoadable} from '@fuse';

export const Error404PageConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/pages/errors/error-404',
            component: FuseLoadable({
                loader: () => import('./Error404Page')
            })
        }
    ]
};
