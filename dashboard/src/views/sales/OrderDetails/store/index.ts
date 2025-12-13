import { combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import reducers, {
    OrderDetailState,
    SLICE_NAME,
} from '@/views/sales/OrderDetails/store/orderDetailSlice'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: OrderDetailState
        }
    }
> = useSelector

export * from './orderDetailSlice'
export { useAppDispatch } from '@/store'
export default reducer
