import {FuseLoadable} from '@fuse';


export const KnowledgeBasePageConfig = {
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
    // auth    : authRoles.onlyGuest,
    // routes  : [
    //     {
    //         path     : '/login',
    //         component: Login
    //     }
    // ]




    routes  : [
        {
            path     : '/knowledge-base',
            component: FuseLoadable({
                loader: () => import('./KnowledgeBasePage')
            })
        }
    ]
};
