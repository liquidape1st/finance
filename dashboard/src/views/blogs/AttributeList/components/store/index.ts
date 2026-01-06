import { RootState } from '@/store'
import reducers, {SLICE_NAME, TagListState} from './slice'
import { combineReducers } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useSelector} from 'react-redux'

const reducer = combineReducers({
    data: reducers
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
    [SLICE_NAME]: {
        data: TagListState
    }
}
> = useSelector
export * from './slice'
export {useAppDispatch} from '@/store'
export default reducer