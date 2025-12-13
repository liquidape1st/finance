import { useMemo } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from '@/views/sales/OrderDetails/store'
import type { ColumnDef } from '@/components/shared/DataTable'
import { OrderItemEntityResponse } from '@/@types/schema.order.item.response'
import cloneDeep from 'lodash/cloneDeep'
import { setTableData } from '@/views/sales/ProductList/store'
import ProductImage from '@/components/shared/ProductImage'
import dayjs from 'dayjs'
import { Pagination, Select, Table } from '@/components/ui'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Sorter from '@/components/ui/Table/Sorter'

type Option = {
    value: number
    label: string
}

const { Tr, Th, Td, THead, TBody } = Table

const pageSizeOption: Option[] = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]

const OrderProducts = () => {
    const dispatch = useAppDispatch()
    const { order, tableData } = useAppSelector(
        (state) => state.orderDetailSlice.data,
    )
    const columns: ColumnDef<OrderItemEntityResponse>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <ProductImage
                                filename={row.product.images[0]?.filename}
                                size={60}
                            />
                            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                                {row.product.name}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Quantity',
                accessorKey: 'quantity',
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'text-red-800'}>
                            {row.product.price.toLocaleString('vi')}đ
                        </span>
                    )
                },
            },
            {
                header: 'Total',
                accessorKey: 'total',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'text-red-800'}>
                            {(row.product.price * row.quantity).toLocaleString(
                                'vi',
                            )}
                            đ
                        </span>
                    )
                },
            },
            {
                header: 'Update At',
                accessorKey: 'updatedAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'text-red-800'}>
                            {dayjs(row.updatedAt).format('DD/MM/YYYY')}
                        </span>
                    )
                },
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

    // const onSort = (sort: OnSortParam) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }

    const table = useReactTable({
        data: order.items,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={tableData.total}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select<Option>
                        size="sm"
                        value={pageSizeOption.filter(
                            (option) => option.value === tableData.pageSize,
                        )}
                        options={pageSizeOption}
                        onChange={(option) =>
                            onSelectChange(option?.value || 10)
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderProducts
