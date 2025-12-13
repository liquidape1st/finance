import { OrderStatusEnum } from '@/@types/schema.common.response'

export type UpdateOrderStatusRequest = {
    code: string
    reason: string
    status: OrderStatusEnum
}
