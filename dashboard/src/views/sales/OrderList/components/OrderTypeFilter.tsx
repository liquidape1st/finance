import { Fragment } from 'react'
import { Tabs } from '@/components/ui'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import {
    getOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '@/views/sales/OrderList/store'
import cloneDeep from 'lodash/cloneDeep'
import { OrderStatusEnum } from '@/@types/schema.common.response'
import { MdBallot, MdOutlineConfirmationNumber } from 'react-icons/md'
import { RiPassPendingLine } from 'react-icons/ri'
import { FaRunning } from 'react-icons/fa'
import { PiTruckLight } from 'react-icons/pi'
import { AiOutlineFileDone } from 'react-icons/ai'
import { TbBasketCancel } from 'react-icons/tb'

const OrderTypeFilter = () => {
    const dispatch = useAppDispatch()
    const { tableData } = useAppSelector((state) => state.salesOrderList.data)
    const onHandleChangeTypeOrderFilter = (status: string) => {
        const cloneTableData = cloneDeep(tableData)
        cloneTableData.status = status
        setTableData(cloneTableData)
        dispatch(getOrders(cloneTableData))
    }
    return (
        <Fragment>
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab0" icon={<MdBallot />}>
                        <button
                            onClick={() => onHandleChangeTypeOrderFilter('')}
                        >
                            All
                        </button>
                    </TabNav>
                    <TabNav value="tab1" icon={<RiPassPendingLine />}>
                        <button
                            onClick={() =>
                                onHandleChangeTypeOrderFilter(
                                    OrderStatusEnum.PENDING,
                                )
                            }
                        >
                            Pending
                        </button>
                    </TabNav>
                    <TabNav value="tab2" icon={<MdOutlineConfirmationNumber />}>
                        <button
                            onClick={() =>
                                onHandleChangeTypeOrderFilter(
                                    OrderStatusEnum.CONFIRMED,
                                )
                            }
                        >
                            Confirmed
                        </button>
                    </TabNav>
                    <TabNav value="tab3" icon={<FaRunning />}>
                        <button
                            onClick={() =>
                                onHandleChangeTypeOrderFilter(
                                    OrderStatusEnum.PROCESSING,
                                )
                            }
                        >
                            Processing
                        </button>
                    </TabNav>
                    <TabNav value="tab4" icon={<PiTruckLight />}>
                        <button
                            onClick={() =>
                                onHandleChangeTypeOrderFilter(
                                    OrderStatusEnum.SHIPPED,
                                )
                            }
                        >
                            Shipped
                        </button>
                    </TabNav>
                    <TabNav value="tab5" icon={<AiOutlineFileDone />}>
                        <button
                            onClick={() =>
                                onHandleChangeTypeOrderFilter(
                                    OrderStatusEnum.DELIVERED,
                                )
                            }
                        >
                            Delivered
                        </button>
                    </TabNav>
                    <TabNav value="tab6" icon={<TbBasketCancel />}>
                        <button
                            onClick={() =>
                                onHandleChangeTypeOrderFilter(
                                    OrderStatusEnum.CANCELLED,
                                )
                            }
                        >
                            Cancelled
                        </button>
                    </TabNav>
                </TabList>
            </Tabs>
        </Fragment>
    )
}
export default OrderTypeFilter
