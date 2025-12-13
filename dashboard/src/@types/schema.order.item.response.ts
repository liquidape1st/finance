import { ProductEntityResponse } from '@/@types/schema.product.respone'

export type OrderItemEntityResponse = {
    id: string,
    product: ProductEntityResponse
    quantity: number
    createdAt: number
    updatedAt: number
}