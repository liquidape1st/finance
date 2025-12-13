import { TableQueries } from '@/@types/common'
import { OrderStatusEnum } from '@/@types/schema.common.response'

export type OrderTableQueries = TableQueries & {
    status: OrderStatusEnum | string
}
