import { TagRequest } from "@/@types/schema.tag.request"
import { TagTranslationResponse } from "@/@types/schema.tag.respone"
import { Button, FormItem, Input } from "@/components/ui"
import FormContainer from "@/components/ui/Form/FormContainer"
import { Field, FieldArray, Form, Formik, FormikProps, getIn } from "formik"
import { cloneDeep } from "lodash"
import { forwardRef, useEffect } from "react"
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { useAppSelector } from "../store"

type InitialData = {
    id: string
    translations: TagTranslationResponse[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

type TagForm = {
    initialData?: InitialData
    onFormSubmit: (formData: InitialData, setSubmitting: SetSubmitting) => void
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>


const validationSchema = Yup.object().shape({
    translations: Yup.array()
        .of(
            Yup.object({
                name: Yup.string().required(),
                langCode: Yup.string().required(),
                slug: Yup.string().required(),
            }),
        )
        .min(1),
})

const LicenseForm = forwardRef<FormikRef, TagForm>((props, ref) => {
    const { actionMode, selectedCategoryObject } = useAppSelector((state) => state.systemCategoryListManageSlice .data);

    useEffect(() => {
        console.log('selectedCategoryObject', selectedCategoryObject)
    }, [selectedCategoryObject])


    useEffect(() => {
        console.log('actionMode', actionMode)
    }, [actionMode])

    const {
        initialData = {
            id: actionMode === "CREATE" ? '' : selectedCategoryObject.id,
            translations: [
                {
                    id: selectedCategoryObject?.translations[0]?.id || '',
                    langCode: 'en',
                    name: selectedCategoryObject?.translations[0]?.name || '',
                    slug: selectedCategoryObject?.translations[0]?.slug || '',
                },
                {
                    id: selectedCategoryObject?.translations[1]?.id || '',
                    langCode: 'vi',
                    name: selectedCategoryObject?.translations[1]?.name || '',
                    slug: selectedCategoryObject?.translations[1]?.slug || '',
                },
            ],
        },
        onFormSubmit,
    } = props

    return (
        <>
            <Formik
                innerRef={ref}
                key={`${selectedCategoryObject?.id}-${actionMode}`}
                initialValues={{
                    ...initialData
                }}
                validationSchema={validationSchema}
                onSubmit={(values: TagRequest, { setSubmitting }) => {
                    console.log('submitted')
                    console.log(values)
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }: FormikProps<TagRequest>) => (
                    <Form>
                        <FormContainer>
                            <FieldArray name="translations" key={selectedCategoryObject?.id}>
                                {() =>
                                    values.translations.map((t, index) => {
                                        const slugError = getIn(
                                            errors,
                                            `translations.${index}.slug`,
                                        )
                                        const slugTouched = getIn(
                                            touched,
                                            `translations.${index}.slug`,
                                        )

                                        const nameError = getIn(
                                            errors,
                                            `translations.${index}.name`,
                                        )
                                        const nameTouched = getIn(
                                            touched,
                                            `translations.${index}.name`,
                                        )

                                        return (
                                            <div key={t.langCode}>
                                                <h4>
                                                    {t.langCode.toUpperCase()}
                                                </h4>
                                                <FormItem

                                                    label="Slug"
                                                    invalid={
                                                        !!(
                                                            slugTouched &&
                                                            slugError
                                                        )
                                                    }
                                                    errorMessage={slugError}
                                                >
                                                    <Field
                                                        name={`translations.${index}.slug`}
                                                        component={Input}
                                                    />
                                                </FormItem>

                                                <FormItem
                                                    label="Name"
                                                    invalid={
                                                        !!(
                                                            nameTouched &&
                                                            nameError
                                                        )
                                                    }
                                                    errorMessage={
                                                        nameError
                                                    }
                                                >
                                                    <Field
                                                        name={`translations.${index}.name`}
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </div>
                                        )
                                    })
                                }
                            </FieldArray>
                            <div className="flex justify-end">
                                <Button
                                    key={actionMode}
                                    size="sm"
                                    variant="solid"
                                    loading={isSubmitting}
                                    icon={<AiOutlineSave />}
                                    type="submit"
                                >
                                    {actionMode === "CREATE" ? 'Create' : 'Update'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})
export default LicenseForm