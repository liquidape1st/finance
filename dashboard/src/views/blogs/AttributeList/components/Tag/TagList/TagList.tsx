import { TagRequest } from "@/@types/schema.tag.request";
import { TagResponse } from "@/@types/schema.tag.respone";
import { ColumnDef, DataTable, DataTableResetHandle, OnSortParam } from "@/components/shared";
import { Button, Card, Tag, Tooltip } from "@/components/ui";
import { injectReducer } from "@/store";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { truncate } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiRefresh } from "react-icons/hi";
import reducer, { createTag, deleteTag, searchTags, setActionMode, setSelectedTagObject, setTableData, updateTag, useAppDispatch, useAppSelector } from "../store";
import LicenseForm, { SetSubmitting } from "../TagForm/TagForm";
import TagTableSearch from "./components/TagTableSearch/TagTableSearch";

injectReducer('systemTagListManageSlice', reducer)

const ActionColumn = ({ row }: { row: TagResponse }) => {
    const dispatch = useAppDispatch()
    const { tableData } = useAppSelector((state) => state.systemTagListManageSlice.data);
    const { textTheme } = useThemeClass()

    const onDelete = () => {
        dispatch(deleteTag(row.id)).then(() => {
            dispatch(searchTags(tableData))
        })

    }

    const onEdit = useCallback(() => {
        dispatch(setActionMode("UPDATE"))
        dispatch(setSelectedTagObject(row))
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

const TagList = () => {
    const dispatch = useAppDispatch();
    const { tags, tableData, actionMode } = useAppSelector((state) => state.systemTagListManageSlice.data);

    const tableRef = useRef<DataTableResetHandle>(null)
    useEffect(() => {
        dispatch(searchTags(tableData))
    }, [])


    const columns: ColumnDef<TagResponse>[] = useMemo(
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
                        <span className={'whitespace-nowrap'}>{row.translations[0]?.name || "n/a"}</span>
                    )
                }
            },
            {
                header: 'Slug VN',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[0]?.slug || "n/a"}</span>
                    )
                }
            },
            {
                header: 'name EN',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[1]?.name || "n/a"}</span>
                    )
                }
            },
            {
                header: 'Slug EN',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[1]?.slug || "n/a"}</span>
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
        values: TagRequest,
        setSubmitting: SetSubmitting
    ) => {
        console.log('handleFormSubmit', values, actionMode)
        setSubmitting(true)
        let success
        if (actionMode === "CREATE") {
            success = dispatch(createTag(values)).then(() => {
                dispatch(searchTags(tableData))
            })
        }
        else if (actionMode === "UPDATE") {
            success = dispatch(updateTag(values)).then(() => {
                dispatch(searchTags(tableData))
            })
        }

        setSubmitting(false)
    }

    const onRefresh = () => {
        dispatch(searchTags(tableData))
    }

    const onCreate = () => {
        dispatch(setActionMode("CREATE"))
        dispatch(setSelectedTagObject({
            id: '',
            translations: [],
        }))
    }



    return (
        <Fragment>
            <Card className="!max-w-4xl h-full">
                <div className="flex justify-between">
                    <div>
                        <TagTableSearch />
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
                    data={tags}
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
export default TagList;