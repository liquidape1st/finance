import { forwardRef, useEffect, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { Card } from '@/components/ui'
import { useAppSelector } from '@/views/sales/ProductList/store'
import BaseService from '@/services/BaseService'
import { ProductEntityImage } from '@/@types/schema.product.respone'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type ProductImage = {
    id: string
    name: string
    img: string
}

type InitialData = {
    id?: string
    name: string
    code: string
    img?: string
    imgList: ProductImage[]
    categoryId: string
    price: number
    stock: number
    description: string
    rating: number
}

export type FormModel = InitialData

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    code: Yup.string().required('Code Required'),
    name: Yup.string().required('Name Required'),
    categoryId: Yup.string().required('Category Required'),
    price: Yup.number().required('Price Required'),
    // imgList: Yup.string().required('Image Required'),
    description: Yup.string().required('Description Required'),
    stock: Yup.number().required('Stock Required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const { selectedProduct, selectedDialog } = useAppSelector(
        (state) => state.salesProductList.data,
    )
    const [images, setImages] = useState<ProductEntityImage[]>([])

    const isCreateMode = selectedDialog == 'CREATE'

    useEffect(() => {
        if (!isCreateMode && selectedProduct?.images?.length) {
            ;(async () => {
                const mapped = await Promise.all(
                    selectedProduct.images.map(async (img) => {
                        const res = await BaseService.get(
                            `/s3/sign?fileName=${img.filename}`,
                        )
                        console.log(res.data.data)
                        return { ...img, previewLink: res.data.data }
                    }),
                )
                setImages(mapped)
            })()
        }
    }, [isCreateMode, selectedProduct])

    const {
        type,
        initialData = {
            code: isCreateMode ? 'code' : selectedProduct.code,
            name: isCreateMode ? 'name' : selectedProduct.name,
            categoryId: isCreateMode ? '' : selectedProduct.category.id,
            price: isCreateMode ? 100 : selectedProduct.price,
            images: isCreateMode ? [] : images,
            description: isCreateMode ? 'abcde' : selectedProduct.description,
            stock: isCreateMode ? 12 : selectedProduct.stock,
            rating: isCreateMode ? 2 : selectedProduct.rating,
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    return (
        <>
            <Formik
                enableReinitialize={true}
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                                <div className="lg:col-span-2">
                                    <Card>
                                        <BasicInformationFields
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                        />
                                    </Card>
                                </div>
                                <div className="lg:col-span-1">
                                    <Card className={'h-full'}>
                                        <ProductImages values={values} />
                                    </Card>
                                </div>
                            </div>
                            <div className="-mx-8 px-8 flex items-center justify-between py-4">
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.displayName = 'ProductForm'

export default ProductForm
