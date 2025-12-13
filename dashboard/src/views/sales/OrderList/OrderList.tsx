import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OrdersTable from './components/OrdersTable'
import OrdersTableTools from '@/views/sales/OrderList/components/OrdersTableTools'
import OrderDeleteConfirmation from '@/views/sales/OrderList/components/OrderDeleteConfirmation'
import OrderTypeFilter from '@/views/sales/OrderList/components/OrderTypeFilter'

injectReducer('salesOrderList', reducer)

const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Orders</h3>
                <OrdersTableTools />
            </div>
            <OrderTypeFilter/>
            <OrdersTable />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default OrderList
