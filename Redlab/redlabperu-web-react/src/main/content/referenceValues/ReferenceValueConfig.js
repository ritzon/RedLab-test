import {FuseLoadable} from '@fuse';

export const ReferenceValueConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/referenceValues/:referenceValueId/:referenceValueHandle?',
            component: FuseLoadable({
                loader: () => import('./ReferenceValue')
            })
        },
        {
            path     : '/apps/referenceValues',
            component: FuseLoadable({
                loader: () => import('./ReferenceValues')
            })
        },
        
    ]
};
