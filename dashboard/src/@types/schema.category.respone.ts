import { Pageable, Sort } from '@/@types/common'

export interface CategoryEntityResponse {
    id: string // UUID
    name: string
    createdAt: string // ISO string
    updatedAt: string // ISO string
}