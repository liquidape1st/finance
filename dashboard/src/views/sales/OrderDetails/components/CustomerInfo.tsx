import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import IconText from '@/components/shared/IconText'
import { HiMail, HiPhone, HiExternalLink } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/views/sales/OrderDetails/store'

const CustomerInfo = () => {
    const { order } = useAppSelector((state) => state.orderDetailSlice.data)
    return (
        <Card>
            <h5 className="mb-4">Customer</h5>
            <Link
                className="group flex items-center justify-between"
                to="/app/crm/customer-details?id=11"
            >
                <div className="flex items-center">
                    <Avatar shape="circle" src={""} />
                    <div className="ltr:ml-2 rtl:mr-2">
                        <div className="font-semibold group-hover:text-gray-900 group-hover:dark:text-gray-100">
                            {order?.customerName}
                        </div>
                    </div>
                </div>
                <HiExternalLink className="text-xl hidden group-hover:block" />
            </Link>
            <hr className="my-5" />
            <IconText
                className="mb-4"
                icon={<HiMail className="text-xl opacity-70" />}
            >
                <span className="font-semibold">{order?.customerAddress}</span>
            </IconText>
            <IconText icon={<HiPhone className="text-xl opacity-70" />}>
                <span className="font-semibold">{order?.customerPhone}</span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4">Shipping Address</h6>
            <address className="not-italic">
                <div className="mb-1">{order?.customerProvinceName}</div>
                <div className="mb-1">{order?.customerDistrictName}</div>
                <div className="mb-1">{order?.customerWardName}</div>
                <div>{order?.customerAddress}</div>
            </address>
            <hr className="my-5" />
        </Card>
    )
}

export default CustomerInfo
