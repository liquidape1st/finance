import { ColumnDef, DataTable, DataTableResetHandle, OnSortParam, Row } from "@/components/shared"
import { Fragment, useMemo, useRef } from "react"
import reducer, { setTableData, useAppDispatch, useAppSelector } from "../store";
import { TagResponse } from "@/@types/schema.tag.respone";
import cloneDeep from "lodash/cloneDeep";
import { injectReducer } from "@/store";

injectReducer('systemTagListManageSlice', reducer)
const TagList = () => {
    const dispatch = useAppDispatch();
    const { tags, tableData } = useAppSelector((state) => state.systemTagListManageSlice.data);

    const tableRef = useRef<DataTableResetHandle>(null)

    const columns: ColumnDef<TagResponse>[] = useMemo(
        () => [
            {
                header: 'UUID',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.id}</span>
                    )
                }
            },
            {
                header: 'name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[0].name}</span>
                    )
                }
            },
            {
                header: 'Slug',
                accessorKey: 'slug',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className={'whitespace-nowrap'}>{row.translations[0].slug}</span>
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

    return (
        <Fragment>
            <DataTable
                ref={tableRef}
                selectable
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
        </Fragment>
    )
}
export default TagList;