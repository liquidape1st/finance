import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import RichTextEditor from '@/components/shared/RichTextEditor'
import type { FieldProps, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import ReactHtmlParser from 'html-react-parser'
import * as Yup from 'yup'
import reducer, {
    useAppSelector,
    getBlogDetail,
    resetBlog,
    useAppDispatch,
    getBlogCategories,
} from '@/views/blogs/BlogForm/store'
import { injectReducer } from '@/store'
import { Card, Upload, Dialog, Select } from '@/components/ui'
import { Container } from '@/components/shared'
import { apiPostSystem, apiPostFormDataSystem, apiUpdateSystem } from '@/services/SalesService'
import { ApiResponse } from '@/@types/schema.common.response'
import Cropper, { Area } from 'react-easy-crop'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { useNavigate, useParams } from 'react-router-dom'
import { HiX } from 'react-icons/hi'
import BaseService from '@/services/BaseService'
import type { BlogPostCategoryEntityResponse } from '@/@types/schema.blog.post.category.respone'
import type { AxiosResponse } from 'axios'

type FormModel = {
    title: string
    content: string
    excerpt: string
    image: string
    author: string
    estimatedReadTime: number
    blogCategoryId: string
}

type BlogPostRequest = {
    title: string
    content: string
    excerpt: string
    image: string
    estimatedReadTime: number
    author: string
    blogCategoryId: string
}

type UploadImageResponse = {
    key: string
    presignedUrl: string
}

type SelectOption = BlogPostCategoryEntityResponse & {
    value: string
    label: string
}

type CropState = {
    x: number
    y: number
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    excerpt: Yup.string().required('Excerpt required'),
    content: Yup.string().required('Content required'),
    author: Yup.string().required('Author required'),
    estimatedReadTime: Yup.number().required('Estimated read time required'),
    image: Yup.string().required('Image required'),
    blogCategoryId: Yup.string().required('Category required'),
})

injectReducer('blogFormSlice', reducer)
const BlogPostForm = () => {
    const { id } = useParams<{ id?: string }>()
    const isEditMode = !!id
    const blog = useAppSelector((state) => state.blogFormSlice.data.blog)
    const blogCategories = useAppSelector((state) => state.blogFormSlice.data.blogCategories)
    const loading = useAppSelector((state) => state.blogFormSlice.data.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [previewFiles, setPreviewFiles] = useState<File[]>([])
    const [cropDialogOpen, setCropDialogOpen] = useState<boolean>(false)
    const [cropImageSrc, setCropImageSrc] = useState<string>('')
    const [crop, setCrop] = useState<CropState>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [pendingFile, setPendingFile] = useState<File | null>(null)
    const [pendingForm, setPendingForm] = useState<FormikProps<FormModel> | null>(null)
    const [cropping, setCropping] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)
    const [previewImageUrl, setPreviewImageUrl] = useState<string>('')

    useEffect(() => {
        dispatch(getBlogCategories())
    }, [dispatch])

    // Load blog detail khi edit mode
    useEffect(() => {
        if (isEditMode && id) {
            dispatch(getBlogDetail(id))
        } else {
            dispatch(resetBlog())
        }
        return () => {
            if (!isEditMode) {
                dispatch(resetBlog())
            }
        }
    }, [id, isEditMode, dispatch])

    // Load preview image URL khi có blog image
    useEffect(() => {
        const loadPreviewImage = async (): Promise<void> => {
            if (blog.image && isEditMode && blog.id) {
                try {
                    const res = await BaseService.get<ApiResponse<string>>(
                        `/s3/sign?fileName=${blog.image}`,
                    )
                    setPreviewImageUrl(res.data.data)
                } catch (err: unknown) {
                    console.error('Error loading preview image:', err)
                    setPreviewImageUrl('')
                }
            } else if (!blog.image || !isEditMode) {
                setPreviewImageUrl('')
            }
        }
        loadPreviewImage()
    }, [blog.image, blog.id, isEditMode])

    const readFileAsDataUrl = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error('FILE_READ_ERROR'))
            reader.readAsDataURL(file)
        })
    }

    const createImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', () =>
                reject(new Error('IMAGE_LOAD_ERROR'))
            )
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
        })
    }

    const getCroppedFile = async (
        imageSrc: string,
        cropPixels: Area,
        fileName: string,
        fileType: string
    ): Promise<File> => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            throw new Error('CANVAS_CONTEXT_ERROR')
        }

        canvas.width = cropPixels.width
        canvas.height = cropPixels.height

        ctx.drawImage(
            image,
            cropPixels.x,
            cropPixels.y,
            cropPixels.width,
            cropPixels.height,
            0,
            0,
            cropPixels.width,
            cropPixels.height
        )

        return new Promise<File>((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('CROP_BLOB_ERROR'))
                        return
                    }
                    resolve(new File([blob], fileName, { type: fileType }))
                },
                fileType,
                1
            )
        })
    }

    const uploadImage = async (file: File): Promise<AxiosResponse<ApiResponse<UploadImageResponse>>> => {
        const formData = new FormData()
        formData.append('file', file)

        return await apiPostFormDataSystem<ApiResponse<UploadImageResponse>, FormData>(
            '/s3/upload',
            formData,
        )
    }

    const onComplete = async (
        value: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ): Promise<void> => {
        setSubmitting(true)
        try {
            const requestData: BlogPostRequest = {
                title: value.title,
                content: value.content,
                excerpt: value.excerpt,
                image: value.image,
                author: value.author,
                estimatedReadTime: value.estimatedReadTime,
                blogCategoryId: value.blogCategoryId
            }

            let response
            if (isEditMode && id) {
                // Update existing blog
                response = await apiUpdateSystem<
                    ApiResponse<unknown>,
                    BlogPostRequest
                >('posts/update', requestData, id)

                if (response.data) {
                    toast.push(
                        <Notification
                            title="Cập nhật blog thành công"
                            type="success"
                        />,
                        {
                            placement: 'top-center',
                        }
                    )
                    navigate('/app/sales/blog-post-list')
                }
            } else {
                // Create new blog
                response = await apiPostSystem<
                    ApiResponse<unknown>,
                    BlogPostRequest
                >('posts/create', requestData)

                if (response.data) {
                    toast.push(
                        <Notification
                            title="Tạo blog thành công"
                            type="success"
                        />,
                        {
                            placement: 'top-center',
                        }
                    )
                    navigate('/app/sales/blog-post-list')
                }
            }
        } catch (error: unknown) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} blog:`, error)
            toast.push(
                <Notification
                    title={isEditMode ? 'Cập nhật blog thất bại' : 'Tạo blog thất bại'}
                    type="danger"
                >
                    Vui lòng thử lại sau.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } finally {
            setSubmitting(false)
        }
    }

    const openCropDialog = async (file: File, form: FormikProps<FormModel>): Promise<void> => {
        try {
            const imgSrc = await readFileAsDataUrl(file)
            setCropImageSrc(imgSrc)
            setPendingFile(file)
            setPendingForm(form)
            setCrop({ x: 0, y: 0 })
            setZoom(1)
            setCroppedAreaPixels(null)
            setCropDialogOpen(true)
        } catch (error: unknown) {
            console.error(error)
            toast.push(
                <Notification
                    title="Lỗi đọc file"
                    type="danger"
                >
                    Không thể đọc file ảnh.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const closeCropDialog = (): void => {
        if (cropping || uploading) {
            return
        }
        setCropDialogOpen(false)
        setPendingFile(null)
        setPendingForm(null)
        setCropImageSrc('')
        setCroppedAreaPixels(null)
    }

    const handleCropConfirm = async (): Promise<void> => {
        if (!pendingFile || !croppedAreaPixels || !cropImageSrc || !pendingForm) {
            return
        }
        setCropping(true)
        try {
            const croppedFile = await getCroppedFile(
                cropImageSrc,
                croppedAreaPixels,
                pendingFile.name,
                pendingFile.type
            )

            setUploading(true)
            const uploadResponse = await uploadImage(croppedFile)
            if (!uploadResponse) {
                throw new Error('UPLOAD_FAILED')
            }

            // Lưu key (filename) vào form field, presignedUrl chỉ dùng để preview
            const imageKey = uploadResponse.data.data.key
            const previewUrl = uploadResponse.data.data.presignedUrl
            await pendingForm.setFieldValue('image', imageKey)
            setPreviewImageUrl(previewUrl)
            setPreviewFiles([croppedFile])

            closeCropDialog()
            toast.push(
                <Notification
                    title="Upload ảnh thành công"
                    type="success"
                />,
                {
                    placement: 'top-center',
                }
            )
        } catch (error: unknown) {
            console.error(error)
            toast.push(
                <Notification
                    title="Upload ảnh thất bại"
                    type="danger"
                >
                    Không thể upload ảnh, vui lòng thử lại.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } finally {
            setCropping(false)
            setUploading(false)
        }
    }
    const beforeUpload = (files: FileList | null, fileList: File[]): string | boolean => {
        let valid: string | boolean = true
        const maxUpload: number = 1
        const allowedFileType: string[] = ['image/jpeg', 'image/png', 'image/jpg']
        const maxFileSize: number = 10 * 1024 * 1024 // 10MB
        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Vui lòng upload file .jpeg hoặc .png!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Kích thước ảnh không được vượt quá 10MB!'
                }
            }
        }

        if (fileList.length >= maxUpload) {
            return `Bạn chỉ có thể upload ${maxUpload} file`
        }

        return valid
    }
    // Đợi data load xong khi edit mode
    if (isEditMode && (loading || !blog.id)) {
        return (
            <Container className={' h-[85svh]'}>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
                    </div>
                </div>
            </Container>
        )
    }

    return (
        <Container className={' h-[85svh]'}>
            <Formik
                key={isEditMode ? `edit-${blog.id || 'loading'}` : 'new-blog'}
                enableReinitialize={true}
                initialValues={{
                    title: blog.title || '',
                    content: blog.content || '',
                    excerpt: blog.excerpt || '',
                    author: blog.author || '',
                    image: blog.image || '',
                    estimatedReadTime: blog.estimatedReadTime || 5,
                    blogCategoryId: blog?.blogCategory?.id || ''
                }}
                validationSchema={validationSchema}
                onSubmit={async (values: FormModel, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }): Promise<void> => {
                    await onComplete(values, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }: FormikProps<FormModel>) => (
                    <Form className={'h-full'}>
                        <div className={'grid grid-cols-12 gap-10'}>
                            <Card
                                className={
                                    'col-span-6 h-[90svh] overflow-auto'
                                }
                            >
                                <FormItem
                                    label="Title"
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="title"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Excerpt"
                                    invalid={errors.excerpt && touched.excerpt}
                                    errorMessage={errors.excerpt}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="excerpt"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Author"
                                    invalid={errors.author && touched.author}
                                    errorMessage={errors.author}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="author"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Estimated Read Time"
                                    invalid={errors.estimatedReadTime && touched.estimatedReadTime}
                                    errorMessage={errors.estimatedReadTime}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="estimatedReadTime"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Category"
                                    invalid={errors.blogCategoryId && touched.blogCategoryId}
                                    errorMessage={errors.blogCategoryId}
                                >
                                    <Field name="blogCategoryId">
                                        {({ field, form }: FieldProps<string, FormModel>) => {
                                            const transformedData: SelectOption[] = blogCategories.map((item: BlogPostCategoryEntityResponse) => ({
                                                ...item,
                                                value: item.id,
                                                label: item.name,
                                            }));
                                            return (
                                                <Select
                                                    placeholder="Category"
                                                    field={field}
                                                    form={form}
                                                    options={transformedData}
                                                    value={transformedData.filter(
                                                        (s: SelectOption) =>
                                                            s.id ===
                                                            values.blogCategoryId
                                                    )}
                                                    onChange={(s: SelectOption | null) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            s?.id || ''
                                                        )
                                                    }
                                                />
                                            )
                                        }}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="Image"
                                    invalid={errors.image && touched.image}
                                    errorMessage={errors.image}
                                >
                                    <Field name="image">
                                        {({
                                            field,
                                            form,
                                        }: FieldProps<string, FormModel>) => {
                                            return (
                                                <div>
                                                    {form.values.image ? (
                                                        <div className="space-y-4">
                                                            <div className="relative inline-block w-full">
                                                                <div className='rounded border-gray-300 dark:border-gray-600 border flex items-center gap-2'>
                                                                    <img
                                                                        src={previewImageUrl || form.values.image}
                                                                        alt="Preview"
                                                                        className="max-w-full max-h-24"
                                                                    />
                                                                    <div>
                                                                        {
                                                                            form.values.image
                                                                        }
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="absolute right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                                                                        disabled={uploading || cropDialogOpen}
                                                                        title="Xóa ảnh"
                                                                        onClick={async (): Promise<void> => {
                                                                            await form.setFieldValue(field.name, '')
                                                                            setPreviewFiles([])
                                                                            setPreviewImageUrl('')
                                                                        }}
                                                                    >
                                                                        <HiX className="" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                Hoặc chọn ảnh khác:
                                                            </div>
                                                            <Upload
                                                                key={`upload-${form.values.image}`}
                                                                draggable
                                                                fileList={[]}
                                                                beforeUpload={beforeUpload}
                                                                showList={false}
                                                                disabled={uploading || cropDialogOpen}
                                                                onChange={async (files: File[]): Promise<void> => {
                                                                    if (files && files.length > 0) {
                                                                        await openCropDialog(files[0], form)
                                                                    }
                                                                }}
                                                                onFileRemove={async (): Promise<void> => {
                                                                    await form.setFieldValue(field.name, '')
                                                                    setPreviewFiles([])
                                                                    setPreviewImageUrl('')
                                                                }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <Upload
                                                            key={blog.id || 'upload-new'}
                                                            draggable
                                                            fileList={previewFiles}
                                                            beforeUpload={beforeUpload}
                                                            showList={false}
                                                            disabled={uploading || cropDialogOpen}
                                                            onChange={async (files: File[]): Promise<void> => {
                                                                if (files && files.length > 0) {
                                                                    await openCropDialog(files[0], form)
                                                                }
                                                            }}
                                                            onFileRemove={async (): Promise<void> => {
                                                                await form.setFieldValue(field.name, '')
                                                                setPreviewFiles([])
                                                                setPreviewImageUrl('')
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        }}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="Content"
                                    className="mb-0  overflow-auto max-h-full"
                                    labelClass="!justify-start"
                                    invalid={errors.content && touched.content}
                                    errorMessage={errors.content}
                                >
                                    <Field
                                        name="content"
                                        className={'bg-yellow-900'}
                                    >
                                        {({ field, form }: FieldProps<string, FormModel>) => (
                                            <RichTextEditor
                                                value={field.value}
                                                onChange={(val: string) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        val,
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        loading={isSubmitting || loading}
                                        variant="solid"
                                    >
                                        {isEditMode ? 'Cập nhật' : 'Tạo mới'}
                                    </Button>
                                </div>
                            </Card>
                            <Card
                                className={'col-span-6 h-[90svh] overflow-auto'}
                            >
                                <div>
                                    <div className={'max-h-full'}>
                                        <h4 className="">{values.title}</h4>
                                        <div className="prose dark:prose-invert max-w-none">
                                            {ReactHtmlParser(
                                                values.content || '',
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Dialog
                            isOpen={cropDialogOpen}
                            width={760}
                            onClose={closeCropDialog}
                            onRequestClose={closeCropDialog}
                        >
                            <h5 className="mb-4">Chỉnh sửa ảnh</h5>
                            <div className="relative h-[500px] bg-gray-900">
                                {cropImageSrc && (
                                    <Cropper
                                        image={cropImageSrc}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={16 / 9}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={(_: Area, areaPixels: Area): void =>
                                            setCroppedAreaPixels(areaPixels)
                                        }
                                    />
                                )}
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-semibold mb-2">
                                    Thu phóng
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    className="w-full accent-blue-500"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZoom(Number(e.target.value))}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <Button
                                    type="button"
                                    variant="plain"
                                    disabled={cropping || uploading}
                                    onClick={closeCropDialog}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="button"
                                    variant="solid"
                                    loading={cropping || uploading}
                                    disabled={!croppedAreaPixels}
                                    onClick={handleCropConfirm}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </Dialog>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default BlogPostForm
