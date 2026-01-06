import {useRef} from 'react'
import Input from '@/components/ui/Input'
import {HiOutlineSearch} from 'react-icons/hi'

import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type {TableQueries} from '@/@types/common'
import type {ChangeEvent} from 'react'
import { searchTags, setTableData, useAppDispatch, useAppSelector } from '../../../store'

const TagTableSearch = () => {
    const dispatch = useAppDispatch()

    const searchInput = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.systemTagListManageSlice.data.tableData
    )
    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (val.length > 1) {
            fetchData(newTableData)
        }

        if (val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(searchTags(data))
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={searchInput}
            className="lg:w-64"
            size="sm"
            placeholder="Tìm kiếm"
            prefix={<HiOutlineSearch className="text-lg"/>}
            onChange={onEdit}
        />
    )
}

export default TagTableSearch;