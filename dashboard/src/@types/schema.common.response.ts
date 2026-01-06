import { Pageable, Sort } from '@/@types/common'

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

export type Paginated<T = unknown> = {
    content: T[]
    pageable: Pageable
    totalElements: number
    sort: Sort
}
