import { useEffect, useMemo, useRef } from 'react'
import type {
    ColumnDef,
    DataTableResetHandle,
    OnSortParam,
} from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    searchPageProducts,
    setOpenProductFormDialog,
    setSelectedDialog,
    setSelectedProduct,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import cloneDeep from 'lodash/cloneDeep'
import { ProductEntityResponse } from '@/@types/schema.product.respone'
import { Badge } from '@/components/ui'
import ProductImage from '@/components/shared/ProductImage'

const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'In Stock',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Limited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Out of Stock',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }: { row: ProductEntityResponse }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()

    const onEdit = () => {
        dispatch(setSelectedProduct(row))
        dispatch(setSelectedDialog('UPDATE'))
        dispatch(setOpenProductFormDialog(true))
    }

    const onDelete = () => {
        dispatch(setSelectedProduct(row))
        dispatch(setOpenProductFormDialog(true))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductColumn = ({ row }: { row: ProductEntityResponse }) => {
    return (
        <div className="flex items-center">
            <ProductImage filename={row.images[0]?.filename} size={60} />
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const ProductTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesProductList.data.tableData,
    )

    const filterData = useAppSelector(
        (state) => state.salesProductList.data.filterData,
    )

    const loading = useAppSelector(
        (state) => state.salesProductList.data.loading,
    )

    const data = useAppSelector(
        (state) => state.salesProductList.data.productList,
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total],
    )

    const fetchData = () => {
        dispatch(
            searchPageProducts({
                pageIndex,
                pageSize,
                sort,
                query,
                filterData,
            }),
        )
    }

    const columns: ColumnDef<ProductEntityResponse>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Code',
                accessorKey: 'code',
                sortable: true,
            },
            {
                header: 'Slug',
                accessorKey: 'slug',
                sortable: true,
            },
            {
                header: 'Category',
                accessorKey: 'category',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">{row.category.name}</span>
                    )
                },
            },
            {
                header: 'Stock',
                accessorKey: 'stock',
                sortable: true,
            },
            {
                header: 'Sold',
                accessorKey: 'soldCount',
                sortable: true,
            },
            {
                header: 'Rating',
                accessorKey: 'rating',
                sortable: true,
            },
            {
                header: 'Price',
                accessorKey: 'price',
                cell: (props) => {
                    const { price } = props.row.original
                    return <span>${price}</span>
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { stock } = props.row.original

                    const statusNumber = stock === 0 ? 2 : stock <= 50 ? 1 : 0

                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[statusNumber].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[statusNumber].textClass}`}
                            >
                                {inventoryStatusColor[statusNumber].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Create At',
                accessorKey: 'createdAt',
            },
            {
                header: 'Update At',
                accessorKey: 'updatedAt',
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

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation />
        </>
    )
}

export default ProductTable
