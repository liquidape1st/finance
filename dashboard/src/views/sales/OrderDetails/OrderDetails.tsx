import { useEffect } from 'react'
import classNames from 'classnames'
import Tag from '@/components/ui/Tag'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { HiOutlineCalendar } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'
import reducer, {
    getDetailOrder,
    useAppDispatch,
    useAppSelector,
} from '@/views/sales/OrderDetails/store'
import { injectReducer } from '@/store'
import OrderProducts from '@/views/sales/OrderDetails/components/OrderProducts'
import OrderStep from '@/views/sales/OrderDetails/components/OrderStep'
import { Button, Card } from '@/components/ui'
import CustomerInfo from '@/views/sales/OrderDetails/components/CustomerInfo'
import PaymentSummary from '@/views/sales/OrderDetails/components/PaymentSummary'

type PaymentStatus = {
    label: string
    class: string
}

const paymentStatus: Record<string, PaymentStatus> = {
    PAID: {
        label: 'Paid',
        class: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
    },
    PENDING: {
        label: 'Pending',
        class: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
    },
    FAILED: {
        label: 'Failed',
        class: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
    },
    REFUNDED: {
        label: 'Refunded',
        class: 'text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
    },
}
injectReducer('orderDetailSlice', reducer)
const OrderDetails = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { order, loading } = useAppSelector(
        (state) => state.orderDetailSlice.data,
    )
    useEffect(() => {
        console.log("order", order)
    }, [])
    useEffect(() => {
        const id = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1,
        )
        if (id) {
            dispatch(getDetailOrder(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(order) && (
                    <>
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <h3>
                                    <span>Order</span>
                                    <span className="ltr:ml-2 rtl:mr-2">
                                        #{order.code}
                                    </span>
                                </h3>
                                <Tag
                                    className={classNames(
                                        'border-0 rounded-md ltr:ml-2 rtl:mr-2',
                                        paymentStatus[order.paymentStatus || 0]
                                            .class,
                                    )}
                                >
                                    {
                                        paymentStatus[order.paymentStatus || 0]
                                            .label
                                    }
                                </Tag>
                                {/*<Tag*/}
                                {/*    className={classNames(*/}
                                {/*        'border-0 rounded-md ltr:ml-2 rtl:mr-2',*/}
                                {/*        progressStatus[order.progressStatus || 0]*/}
                                {/*            .class,*/}
                                {/*    )}*/}
                                {/*>*/}
                                {/*    {*/}
                                {/*        progressStatus[order.progressStatus || 0]*/}
                                {/*            .label*/}
                                {/*    }*/}
                                {/*</Tag>*/}
                            </div>
                            <span className="flex items-center">
                                <HiOutlineCalendar className="text-lg" />
                                <span className="ltr:ml-1 rtl:mr-1">
                                    {dayjs
                                        .unix(order.createdAt || 0)
                                        .format('ddd DD-MMM-YYYY, hh:mm A')}
                                </span>
                            </span>
                        </div>
                        <div className="xl:flex gap-4">
                            <div className="w-full">
                                <Card>
                                    <OrderStep/>
                                </Card>
                                <Card className={'mt-4 h-[850px]'} bodyClass={"h-full"}>
                                    <div className={'flex justify-end mb-4'}>
                                        <Button variant={'solid'} size={'sm'}>
                                            Thêm sản phẩm
                                        </Button>
                                    </div>
                                    <OrderProducts />
                                </Card>
                                {/*<div className="xl:grid grid-cols-2 gap-4">*/}
                                {/*    <ShippingInfo data={order.shipping} />*/}
                                {/*    <PaymentSummary*/}
                                {/*        data={order.paymentSummary}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                {/*<Activity data={order.activity} />*/}
                            </div>
                            <div className="xl:max-w-[450px] 2xl:max-w-[550px] 3xl:max-w-[650px] w-full">
                                <CustomerInfo />
                                <PaymentSummary/>
                            </div>
                        </div>
                    </>
                )}
            </Loading>
            {!loading && isEmpty(order) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No order found!"
                    />
                    <h3 className="mt-8">No order found!</h3>
                </div>
            )}
        </>
    )
}

export default OrderDetails
