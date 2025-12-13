import type { Routes } from '@/@types/routes'
import { APP_PREFIX_PATH, PAGES_PREFIX_PATH } from '@/constants/route.constant'
import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'

export const publicRoutes: Routes = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password/:aaaa`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
]

export const protectedRoutes: Routes = [
    {
        key: 'appsSales.blogPost',
        path: `${APP_PREFIX_PATH}/sales/blog-post-list`,
        component: lazy(() => import('@/views/blogs/BlogPostList/BlogPostList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsSales.blogPost.detail',
        path: `${APP_PREFIX_PATH}/sales/blog-post/:id?`,
        component: lazy(() => import('@/views/blogs/BlogForm/BlogPostForm')),
        authority: [ADMIN, USER],
    },
    {
        key: 'pages.welcome',
        path: `${PAGES_PREFIX_PATH}/welcome`,
        component: lazy(() => import('@/views/pages/Welcome')),
        authority: [ADMIN, USER],
    },
    {
        key: 'pages.accessDenied',
        path: '/access-denied',
        component: lazy(() => import('@/views/pages/AccessDenied')),
        authority: [ADMIN, USER],
    },
]
