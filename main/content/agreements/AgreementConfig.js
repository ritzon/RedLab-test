import {FuseLoadable} from '@fuse';

export const AgreementConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/agreements/priceLists/:priceListId/:agreementId',
            component: FuseLoadable({
                loader: () => import('./PriceList')
            })
        },
        {
            path     : '/apps/agreements/priceLists/:agreementId',
            component: FuseLoadable({
                loader: () => import('./PriceLists')
            })
        },
        {
            path     : '/apps/agreements/:agreementId/:agreementHandle?',
            component: FuseLoadable({
                loader: () => import('./Agreement')
            })
        },
        {
            path     : '/apps/agreements',
            component: FuseLoadable({
                loader: () => import('./Agreements')
            })
        },
        
    ]
};
