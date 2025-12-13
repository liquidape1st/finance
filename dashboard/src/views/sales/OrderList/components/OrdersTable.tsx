import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
    getOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import { OrderEntityResponse } from '@/@types/schema.order.response'
import { FaRegCreditCard } from 'react-icons/fa'
import { IoCashOutline } from 'react-icons/io5'
import {
    OrderPaymentStatusEnum,
    OrderStatusEnum,
} from '@/@types/schema.common.response'

const orderPaymentStatusColor: Record<
    OrderPaymentStatusEnum,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    PAID: {
        label: 'Paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-600',
    },
    PENDING: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-600',
    },
    FAILED: {
        label: 'Failed',
        dotClass: 'bg-red-500',
        textClass: 'text-red-600',
    },
    REFUNDED: {
        label: 'Refunded',
        dotClass: 'bg-gray-500',
        textClass: 'text-gray-600',
    },
}


const orderStatusColor: Record<
    OrderStatusEnum,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    PENDING: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-600',
    },
    CONFIRMED: {
        label: 'Confirmed',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-600',
    },
    PROCESSING: {
        label: 'Processing',
        dotClass: 'bg-sky-500',
        textClass: 'text-sky-600',
    },
    SHIPPED: {
        label: 'Shipped',
        dotClass: 'bg-indigo-500',
        textClass: 'text-indigo-600',
    },
    DELIVERED: {
        label: 'Delivered',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-600',
    },
    CANCELLED: {
        label: 'Cancelled',
        dotClass: 'bg-red-500',
        textClass: 'text-red-600',
    },
}

const PaymentMethodImage = ({
    paymentMethod,
    className,
}: {
    paymentMethod: string
    className: string
}) => {
    switch (paymentMethod) {
        case 'CASH':
            return <IoCashOutline className={className} />
        case 'BANK':
            return <FaRegCreditCard className={className} />
        default:
            return <></>
    }
}

const OrderColumn = ({ row }: { row: OrderEntityResponse }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.code}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.code}
        </span>
    )
}

const ActionColumn = ({ row }: { row: OrderEntityResponse }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.code]))
    }

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.code}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const OrdersTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total, status } = useAppSelector(
        (state) => state.salesOrderList.data.tableData,
    )
    const loading = useAppSelector((state) => state.salesOrderList.data.loading)

    const data = useAppSelector((state) => state.salesOrderList.data.orderList)

    const fetchData = useCallback(() => {
        console.log('{ pageIndex, pageSize, sort, query }', {
            pageIndex,
            pageSize,
            sort,
            query,
        })
        dispatch(getOrders({ pageIndex, pageSize, sort, query, status }))
    }, [dispatch, pageIndex, pageSize, sort, query, status])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total],
    )

    const columns: ColumnDef<OrderEntityResponse>[] = useMemo(
        () => [
            {
                header: 'Order',
                accessorKey: 'code',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'Customer',
                accessorKey: 'customerName',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={
                                    orderStatusColor[status].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                            >
                                {orderStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Payment Method',
                accessorKey: 'paymentMethod',
                cell: (props) => {
                    const { paymentMethod } = props.row.original
                    return (
                        <span className="flex items-center gap-2">
                            <PaymentMethodImage
                                className="max-h-[20px]"
                                paymentMethod={paymentMethod}
                            />
                            {paymentMethod}
                        </span>
                    )
                },
            },
            {
                header: 'Payment Status',
                accessorKey: 'paymentStatus',
                cell: (props) => {
                    const { paymentStatus } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={
                                    orderPaymentStatusColor[paymentStatus].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderPaymentStatusColor[paymentStatus].textClass}`}
                            >
                                {orderPaymentStatusColor[paymentStatus].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Sub Total',
                accessorKey: 'subTotal',
                cell: (props) => {
                    const { subTotal } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            className={'text-rose-800'}
                            value={(Math.round(subTotal * 100) / 100).toFixed(0)}
                            suffix={'đ'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: 'feeShip',
                accessorKey: 'feeShip',
                cell: (props) => {
                    const { feeShip } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            className={'text-rose-800'}
                            value={(Math.round(feeShip * 100) / 100).toFixed(0)}
                            suffix={'đ'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: 'Total',
                accessorKey: 'totalAmount',
                cell: (props) => {
                    const { total } = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            className={'text-rose-800'}
                            value={(Math.round(total * 100) / 100).toFixed(0)}
                            suffix={'đ'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: 'Created At',
                accessorKey: 'createdAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs.unix(row.createdAt).format('DD/MM/YYYY')}
                        </span>
                    )
                },
            },
            {
                header: 'Updated At',
                accessorKey: 'updatedAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs.unix(row.updatedAt).format('DD/MM/YYYY')}
                        </span>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        [],
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked: boolean, row: OrderEntityResponse) => {
        if (checked) {
            dispatch(addRowItem([row.code]))
        } else {
            dispatch(removeRowItem(row.code))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<OrderEntityResponse>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.code)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch],
    )

    return (
        <DataTable
            ref={tableRef}
            selectable
            columns={columns}
            data={data}
            loading={loading}
            pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
            onCheckBoxChange={onRowSelect}
            onIndeterminateCheckBoxChange={onAllRowSelect}
        />
    )
}

export default OrdersTable
