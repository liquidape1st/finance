import { OrderItemEntityResponse } from '@/@types/schema.order.item.response'
import {
    OrderPaymentMethodEnum,
    OrderPaymentStatusEnum,
    OrderStatusEnum,
} from '@/@types/schema.common.response'
import { OrderHistoryEntityResponse } from '@/@types/schema.order.history.response'

export type OrderEntityResponse = {
    code: string
    subTotal: number
    feeShip: number
    total: number
    status: OrderStatusEnum
    paymentStatus: OrderPaymentStatusEnum
    paymentMethod: OrderPaymentMethodEnum
    customerName: string
    customerPhone: string
    customerProvinceId: string
    customerProvinceName: string
    customerDistrictId: string
    customerDistrictName: string
    customerWardCode: string
    customerWardName: string
    customerAddress: string
    customerEmail: string
    items: OrderItemEntityResponse[]
    histories: OrderHistoryEntityResponse[]
    createdAt: number
    updatedAt: number
}
