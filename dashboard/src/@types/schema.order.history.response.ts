import {
    OrderPaymentStatusEnum,
    OrderStatusEnum,
} from '@/@types/schema.common.response'

export type OrderHistoryEntityResponse = {
    id: number
    oldStatus: OrderStatusEnum
    newStatus: OrderStatusEnum
    oldPaymentStatus: OrderPaymentStatusEnum
    newPaymentStatus: OrderPaymentStatusEnum
    actionBy: string | null
    reason: string | null
    createdAt: number // Unix timestamp
}
