import {
    ReactNode,
    CSSProperties,
    // ElementType
} from 'react'

// --- Blog Types ---

export interface CategoryTranslation {
    id: string;
    langCode: string;
    name: string;
    categoryId: string;
}

export type BlogTranslationClient = {
    id: string;
    langCode: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    uiType: 'NEWS' | 'LEARN' | 'MARKET';
    contentType: string;
    image: string;
    view: number;
    author: string | null;
    featured: boolean;
    estimatedReadTime: number;
    category: CategoryTranslation;
    createdAt: string;   // ISO datetime
    updatedAt: string;   // ISO datetime

    slugs?: Slug[];
    tags: Tag[]
}

export type Slug = {
    slug: string;
    langCode: string;
}

export type Tag = {
    id: string
    name: string
    langCode: string
}

// --- Common Types ---

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
    countryImageSize?: number
}

export type WithProps = CommonProps

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TypeAttributes {
    type Size = 'lg' | 'md' | 'sm' | 'xs'
    type Shape = 'round' | 'circle' | 'none'
    type Status = 'success' | 'warning' | 'danger' | 'info'
    type FormLayout = 'horizontal' | 'vertical' | 'inline'
    type ControlSize = 'lg' | 'md' | 'sm'
    type MenuVariant = 'light' | 'dark' | 'themed' | 'transparent'
    type Direction = 'ltr' | 'rtl'
}

export type StepStatus = 'complete' | 'pending' | 'in-progress' | 'error'

export type ColorLevel =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900

export type TableQueries = {
    total?: number
    pageIndex: number
    pageSize: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    },
    category: string
    uiType: string
}

export type DetailParamObject = {
    uuid: string
}

export type ApiResponse<T = unknown> = {
    type: string
    title: string
    status: number
    detail: string
    instance: string
    timestamp: string
    traceId: string
    data: T
    name: string
}
export type Sort = {
    key: string
    order: "asc" | "desc" | ""
}
export type Pageable = {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    paged: boolean
    unpaged: boolean
}
export type Paginated<T = unknown> = {
    content: T[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    sort: Sort
    first: boolean
    numberOfElements: number
    empty: boolean
}

// --- Theme Types ---

export type Direction = 'ltr' | 'rtl'
export type Mode = 'light' | 'dark'
export type NavMode = 'transparent' | 'light' | 'dark' | 'themed'
export type ControlSize = 'lg' | 'md' | 'sm' | 'xs'
export type LayoutType =
    | 'simple'
    | 'classic'
    | 'modern'
    | 'stackedSide'
    | 'decked'
    | 'blank'
