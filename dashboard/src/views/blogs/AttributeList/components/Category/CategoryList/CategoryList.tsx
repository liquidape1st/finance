import { CategoryRequest } from "@/@types/schema.category.request";
import { CategoryResponse } from "@/@types/schema.category.respone";
import { ColumnDef, DataTable, DataTableResetHandle, OnSortParam } from "@/components/shared";
import { Button, Card, Tag, Tooltip } from "@/components/ui";
import { injectReducer } from "@/store";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { truncate } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiRefresh } from "react-icons/hi";
import reducer, { createCategory, deleteCategory, searchCategories, setActionMode, setSelectedCategoryObject, setTableData, updateCategory, useAppDispatch, useAppSelector } from "../store";
import LicenseForm, { SetSubmitting } from "../CategoryForm/CategoryForm";
import CategoryTableSearch from "./components/CategoryTableSearch/CategoryTableSearch";

injectReducer('systemCategoryListManageSlice', reducer)

const ActionColumn = ({ row }: { row: CategoryResponse }) => {
    const dispatch = useAppDispatch()
    const { tableData } = useAppSelector((state) => state.systemCategoryListManageSlice.data);
    const { textTheme } = useThemeClass()

    const onDelete = () => {
        dispatch(deleteCategory(row.id)).then(() => {
            dispatch(searchCategories(tableData))
        })

    }

    const onEdit = useCallback(() => {
        dispatch(setActionMode("UPDATE"))
        dispatch(setSelectedCategoryObject(row))
    }, [dispatch, row])

    return (
        <div className="flex text-lg">
            <Tooltip title="Edit">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <HiOutlinePencil size={20} />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash size={20} />
                </span>
            </Tooltip>
        </div>
    )
}

const CategoryList = () => {
    const dispatch = useAppDispatch();
    const { categories, tableData, actionMode } = useAppSelector((state) => state.systemCategoryListManageSlice.data);

    const tableRef = useRef<DataTableResetHandle>(null)
    useEffect(() => {
        dispatch(searchCategories(tableData))
    }, [])


    const columns: ColumnDef<CategoryResponse>[] = useMemo(
        () => [
            {
                header: 'UUID',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{truncate(row.id, { length: 8 })}</span>
                    )
                }
            },
            {
                header: 'name VN',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[1]?.name || "n/a"}</span>
                    )
                }
            },
            {
                header: 'Slug VN',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[1]?.slug || "n/a"}</span>
                    )
                }
            },
            {
                header: 'name EN',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[0]?.name || "n/a"}</span>
                    )
                }
            },
            {
                header: 'Slug EN',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[0]?.slug || "n/a"}</span>
                    )
                }
            },
            {
                header: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <ActionColumn row={row} />
                    )
                }
            },
        ],
        []
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

    const handleFormSubmit = async (
        values: CategoryRequest,
        setSubmitting: SetSubmitting
    ) => {
        console.log('handleFormSubmit', values, actionMode)
        setSubmitting(true)
        let success
        if (actionMode === "CREATE") {
            success = dispatch(createCategory(values)).then(() => {
                dispatch(searchCategories(tableData))
            })
        }
        else if (actionMode === "UPDATE") {
            success = dispatch(updateCategory(values)).then(() => {
                dispatch(searchCategories(tableData))
            })
        }

        setSubmitting(false)
    }

    const onRefresh = () => {
        dispatch(searchCategories(tableData))
    }

    const onCreate = () => {
        dispatch(setActionMode("CREATE"))
        dispatch(setSelectedCategoryObject({
            id: '',
            translations: [],
        }))
    }



    return (
        <Fragment>
            <Card className="h-full">
                <div className="mb-4">
                    <h4>
                        Quản lý Danh mục
                    </h4>
                </div>
                <div className="flex justify-between">
                    <div>
                        <CategoryTableSearch />
                    </div>
                    <div className="flex justify-end gap-2 mb-4">
                        <Button variant="solid" size="sm" icon={<HiRefresh />} onClick={() => onRefresh()}>
                            Refresh
                        </Button>
                        <Button variant="solid" size="sm" icon={<HiPlus />} onClick={() => onCreate()}>
                            Add
                        </Button>
                    </div>
                </div>
                <DataTable
                    ref={tableRef}
                    columns={columns}
                    data={categories}
                    loading={false}
                    pagingData={{
                        total: tableData.total as number,
                        pageIndex: tableData.pageIndex as number,
                        pageSize: tableData.pageSize as number,
                    }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onSelectChange}
                    onSort={onSort}
                />
                <div className="mt-6">
                    <LicenseForm onFormSubmit={handleFormSubmit}></LicenseForm>
                </div>
            </Card>
        </Fragment>
    )
}
export default CategoryList;