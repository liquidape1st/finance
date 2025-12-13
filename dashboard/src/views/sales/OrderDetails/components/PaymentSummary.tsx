import Card from '@/components/ui/Card'
import { NumericFormat } from 'react-number-format'
import { useAppSelector } from '@/views/sales/OrderDetails/store'

type PaymentInfoProps = {
    label?: string
    value?: number
    isLast?: boolean
}

const PaymentInfo = ({ label, value, isLast }: PaymentInfoProps) => {
    return (
        <li
            className={`flex items-center justify-between${
                !isLast ? ' mb-3' : ''
            }`}
        >
            <span>{label}</span>
            <span className="font-semibold">
                <NumericFormat
                    displayType="text"
                    value={(Math.round((value as number) * 100) / 100).toFixed(
                        0,
                    )}
                    suffix={'đ'}
                    thousandSeparator={true}
                />
            </span>
        </li>
    )
}

const PaymentSummary = () => {
    const { order } = useAppSelector((state) => state.orderDetailSlice.data)
    return (
        <Card className="my-4">
            <h5 className="mb-4">Payment Summary</h5>
            <ul>
                <PaymentInfo label="Subtotal" value={order?.subTotal} />
                <PaymentInfo label="Delivery fee" value={order?.feeShip} />
                <PaymentInfo label="Tax(6%)" value={0} />
                <hr className="mb-3" />
                <PaymentInfo isLast label="Total" value={order?.total} />
            </ul>
        </Card>
    )
}

export default PaymentSummary
