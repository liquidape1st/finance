import { Button, Input, Radio, Steps } from '@/components/ui'
import { useRef } from 'react'
import { OrderStatusEnum } from '@/@types/schema.common.response'
import {
    getDetailOrder,
    updateOrderStatus,
    useAppDispatch,
    useAppSelector,
} from '@/views/sales/OrderDetails/store'
import { OrderEntityResponse } from '@/@types/schema.order.response'
import { OrderHistoryEntityResponse } from '@/@types/schema.order.history.response'
import { RiPassPendingLine } from 'react-icons/ri'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import { FaRunning } from 'react-icons/fa'
import { PiTruckLight } from 'react-icons/pi'
import { AiOutlineFileDone } from 'react-icons/ai'
import { TbBasketCancel } from 'react-icons/tb'

const reasons: Record<OrderStatusEnum, string[]> = {
    [OrderStatusEnum.PENDING]: ['Xác nhận đơn hàng', 'Hủy đơn hàng'],
    [OrderStatusEnum.CONFIRMED]: ['Xác nhận đơn hàng'],
    [OrderStatusEnum.PROCESSING]: ['Xác nhận đơn hàng'],
    [OrderStatusEnum.SHIPPED]: ['Xác nhận đơn hàng'],
    [OrderStatusEnum.DELIVERED]: [],
    [OrderStatusEnum.CANCELLED]: [],
}
const OrderStep = () => {
    const { order } = useAppSelector((state) => state.orderDetailSlice.data)

    const reasonRef = useRef<HTMLInputElement>(null)

    const renderOrderStatus = (history: OrderHistoryEntityResponse) => {
        switch (history.newStatus) {
            case OrderStatusEnum.PENDING:
                return (
                    <Steps.Item
                        title="Chờ xác nhận"
                        customIcon={<RiPassPendingLine />}
                    />
                )
            case OrderStatusEnum.CONFIRMED:
                return (
                    <Steps.Item
                        title="Đã xác nhận"
                        customIcon={<MdOutlineConfirmationNumber />}
                    />
                )
            case OrderStatusEnum.PROCESSING:
                return (
                    <Steps.Item title="Đang xử lý" customIcon={<FaRunning />} />
                )
            case OrderStatusEnum.SHIPPED:
                return (
                    <Steps.Item
                        title="Đang vận chuyển"
                        customIcon={<PiTruckLight />}
                    />
                )
            case OrderStatusEnum.DELIVERED:
                return (
                    <Steps.Item
                        title="Giao thành công"
                        customIcon={<AiOutlineFileDone />}
                    />
                )
            case OrderStatusEnum.CANCELLED:
                return (
                    <Steps.Item
                        title="Hủy đơn hàng"
                        customIcon={<TbBasketCancel />}
                    />
                )
        }
    }

    return (
        <div>
            <Steps current={order.histories.length}>
                {order.histories.map((history) => renderOrderStatus(history))}
            </Steps>
            <div className="h-40 py-6">
                <Input
                    ref={reasonRef}
                    textArea
                    placeholder={'Nhập ghi chú cho đơn hàng này'}
                ></Input>
            </div>
            <div className={'flex justify-between'}>
                <div>
                    <Radio.Group value={reasonRef.current?.value}>
                        {reasons[order.status].map((reason, index) => (
                            <Radio
                                key={index}
                                value={reason}
                                onClick={() => {
                                    if (reasonRef.current) {
                                        reasonRef.current.value = reason
                                    }
                                }}
                            >
                                {reason}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
                <div className="text-right">
                    {RenderActionButtons(order, reasonRef)}
                </div>
            </div>
        </div>
    )
}

const RenderActionButtons = (
    order: OrderEntityResponse,
    reasonInputRef: React.RefObject<HTMLInputElement> | null,
) => {
    const dispatch = useAppDispatch()
    const handleChangeStatus = (status: OrderStatusEnum) => {
        dispatch(
            updateOrderStatus({
                reason: reasonInputRef?.current?.value || '',
                status: status,
                code: order.code,
            }),
        )
            .unwrap()
            .then(function () {
                dispatch(getDetailOrder(order.code))
            })
    }

    switch (order.status) {
        case OrderStatusEnum.PENDING:
            return (
                <>
                    <Button
                        className="mx-2"
                        size={'sm'}
                        variant="solid"
                        onClick={() => {
                            handleChangeStatus(OrderStatusEnum.CONFIRMED)
                        }}
                    >
                        Xác nhận đơn hàng
                    </Button>
                    <Button
                        className="mx-2 !bg-red-600"
                        variant="solid"
                        size={'sm'}
                        onClick={() => {
                            handleChangeStatus(OrderStatusEnum.CANCELLED)
                        }}
                    >
                        Hủy đơn hàng
                    </Button>
                </>
            )
        case OrderStatusEnum.CONFIRMED:
            return (
                <>
                    <Button
                        className="mx-2"
                        size={'sm'}
                        variant="solid"
                        onClick={() => {
                            handleChangeStatus(OrderStatusEnum.PROCESSING)
                        }}
                    >
                        Xác nhận đang xử lý
                    </Button>
                    <Button
                        className="mx-2 !bg-red-600"
                        variant="solid"
                        size={'sm'}
                        onClick={() => {
                            handleChangeStatus(OrderStatusEnum.CANCELLED)
                        }}
                    >
                        Hủy đơn hàng
                    </Button>
                </>
            )
        case OrderStatusEnum.PROCESSING:
            return (
                <>
                    <Button
                        className="mx-2"
                        size={'sm'}
                        variant="solid"
                        onClick={() => {
                            handleChangeStatus(OrderStatusEnum.SHIPPED)
                        }}
                    >
                        Xác nhận đang vận chuyển
                    </Button>
                </>
            )
        case OrderStatusEnum.SHIPPED:
            return (
                <>
                    <Button
                        className="mx-2"
                        size={'sm'}
                        variant="solid"
                        onClick={() => {
                            handleChangeStatus(OrderStatusEnum.DELIVERED)
                        }}
                    >
                        Xác nhận đã nhận đơn hàng
                    </Button>
                </>
            )
        case OrderStatusEnum.DELIVERED:
            return <></>
    }
}

export default OrderStep
