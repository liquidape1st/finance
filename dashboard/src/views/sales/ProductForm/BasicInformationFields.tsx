import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import {
    Field,
    FieldProps,
    FormikErrors,
    FormikTouched,
    FormikValues,
} from 'formik'
import Select from '@/components/ui/Select'
import { useAppSelector } from '@/views/sales/ProductList/store'

type FormFieldsName = {
    code: string
    name: string
    categoryId: string
    price: number
    slug: number
    image: string
    description: string
    excerpt: string
    stock: number
    rating: number
}

type BasicInformationFields = {
    values: FormikValues
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { values, touched, errors } = props
    const { categoryList } = useAppSelector(
        (state) => state.salesProductList.data,
    )
    return (
        <div className={'overflow-auto max-h-[800px]'}>
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p>
            <FormItem
                label="Product Code"
                invalid={(errors.code && touched.code) as boolean}
                errorMessage={errors.code}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="code"
                    placeholder="Code"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Product Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Product Slug"
                invalid={(errors.slug && touched.slug) as boolean}
                errorMessage={errors.slug}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="slug"
                    placeholder="Slug"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Price"
                invalid={(errors.price && touched.price) as boolean}
                errorMessage={errors.price}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="price"
                    placeholder="Price"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Stock"
                invalid={(errors.stock && touched.stock) as boolean}
                errorMessage={errors.stock}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="stock"
                    placeholder="Stock"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Category"
                invalid={(errors.categoryId && touched.categoryId) as boolean}
                errorMessage={errors.categoryId}
            >
                <Field name="categoryId">
                    {({ field, form }: FieldProps) => {
                        const mapListCategory = categoryList.map(
                            (category) => ({
                                ...category,
                                label: category.name,
                                value: category.id,
                            }),
                        )

                        return (
                            <Select
                                field={field}
                                form={form}
                                options={mapListCategory}
                                value={mapListCategory.filter(
                                    (category) =>
                                        category.value === values.categoryId,
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(
                                        field.name,
                                        option?.value,
                                    )
                                }
                            />
                        )
                    }}
                </Field>
            </FormItem>
            <FormItem
                label="Excerpt"
                invalid={(errors.excerpt && touched.excerpt) as boolean}
                errorMessage={errors.excerpt}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="excerpt"
                    placeholder="Excerpt"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </div>
    )
}

export default BasicInformationFields
