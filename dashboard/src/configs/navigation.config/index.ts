import type { NavigationTree } from '@/@types/navigation'
import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

const navigationConfig: NavigationTree[] = [
    {
        key: 'apps',
        path: '',
        title: 'APPS',
        translateKey: 'nav.apps',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            // {
            //     key: 'appsSales.dashboard',
            //     path: `${APP_PREFIX_PATH}/sales/dashboard`,
            //     title: 'Dashboard',
            //     translateKey: 'nav.appsSales.dashboard',
            //     icon: 'project',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     subMenu: [],
            // },
            {
                key: 'appsSales.productList',
                path: `${APP_PREFIX_PATH}/sales/product-list`,
                title: 'Product List',
                translateKey: 'nav.appsSales.productList',
                icon: 'sales',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'appsSales.orderList',
                path: `${APP_PREFIX_PATH}/sales/order-list`,
                title: 'Order List',
                translateKey: 'nav.appsSales.orderList',
                icon: 'common',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'appsSales.blogPost',
                path: `${APP_PREFIX_PATH}/sales/blog-post-list`,
                title: 'Blog Posts',
                translateKey: 'nav.appsSales.orderList',
                icon: 'knowledgeBase',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ],
    },
    {
        key: 'apps',
        path: '',
        title: 'APPS',
        translateKey: 'nav.apps',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: []
    }
]

export default navigationConfig
