import ProductForm, {
    FormModel,
    SetSubmitting,
} from '@/views/sales/ProductForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiPostSystem, apiPutDataSystem } from '@/services/SalesService'
import {
    getCategories,
    setOpenProductFormDialog,
    useAppDispatch,
    useAppSelector,
} from '@/views/sales/ProductList/store'
import { useEffect } from 'react'
import { Dialog } from '@/components/ui'
import type { ProductRequest } from '@/@types/schema.request'
import { ApiResponse } from '@/@types/schema.common.response'
import { ProductEntityResponse } from '@/@types/schema.product.respone'

const ProductNew = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { openProductFormDialog, selectedDialog } = useAppSelector(
        (state) => state.salesProductList.data,
    )
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const addProduct = async (data: ProductRequest) => {
        const response = await apiPostSystem<
            ApiResponse<ProductEntityResponse>,
            ProductRequest
        >('/products/create', data)
        return response.data
    }

    const updateProduct = async (code: string, data: ProductRequest) => {
        const response = await apiPutDataSystem<
            ApiResponse<ProductEntityResponse>,
            ProductRequest
        >('/products/update', data, code)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting,
    ) => {
        setSubmitting(true)
        if (selectedDialog == 'CREATE') {
            try {
                const response = await addProduct(values)
                if (response.status === 200) {
                    toast.push(
                        <Notification
                            title={'Successfully added'}
                            type="success"
                            duration={2500}
                        >
                            Product successfully added
                        </Notification>,
                        {
                            placement: 'top-center',
                        },
                    )
                    dispatch(setOpenProductFormDialog(false))
                }
            } catch (error) {
                console.error(error)
                toast.push(
                    <Notification
                        title={'Create product failed'}
                        type="danger"
                        duration={2500}
                    >
                        Could not create product. Please try again.
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )
            } finally {
                setSubmitting(false)
            }
        } else if (selectedDialog == 'UPDATE') {
            try {
                const response = await updateProduct(values.code, values)
                if (response.status === 200) {
                    toast.push(
                        <Notification
                            title={'Successfully update'}
                            type="success"
                            duration={2500}
                        >
                            Product successfully added
                        </Notification>,
                        {
                            placement: 'top-center',
                        },
                    )
                    dispatch(setOpenProductFormDialog(false))
                }
            } catch (error) {
                console.error(error)
                toast.push(
                    <Notification
                        title={'Update product failed'}
                        type="danger"
                        duration={2500}
                    >
                        Could not create product. Please try again.
                    </Notification>,
                    {
                        placement: 'top-center',
                    },
                )
            } finally {
                setSubmitting(false)
            }
        }
    }

    const handleDiscard = () => {
        navigate('/app/sales/product-list')
    }

    return (
        <Dialog
            isOpen={openProductFormDialog}
            className={'!w-[80%]'}
            onClose={() => dispatch(setOpenProductFormDialog(false))}
        >
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </Dialog>
    )
}

export default ProductNew
