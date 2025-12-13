import { useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { FormItem } from '@/components/ui/Form'
import Dialog from '@/components/ui/Dialog'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiEye, HiTrash } from 'react-icons/hi'
import cloneDeep from 'lodash/cloneDeep'
import { Field, FieldInputProps, FieldProps, FormikProps } from 'formik'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { apiPostFormDataSystem } from '@/services/SalesService'
import Cropper, { Area } from 'react-easy-crop'

type UploadImageResponse = {
    data: {
        key: string
        presignedUrl: string
    }
}

type Image = {
    id: string
    filename: string
    previewLink: string
}

type FormModel = {
    images: Image[]
    [key: string]: unknown
}

type ImageListProps = {
    imgList: Image[]
    onImageDelete: (img: Image) => void
}

type ProductImagesProps = {
    values: FormModel
}

type PendingCropContext = {
    form: FormikProps<FormModel>
    fieldName: string
    file: File
}

const ImageList = (props: ImageListProps) => {
    const { imgList, onImageDelete } = props

    const [selectedImg, setSelectedImg] = useState<Image>({} as Image)
    const [viewOpen, setViewOpen] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const onViewOpen = (img: Image) => {
        setSelectedImg(img)
        setViewOpen(true)
    }

    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({} as Image)
        }, 300)
    }

    const onDeleteConfirmation = (img: Image) => {
        setSelectedImg(img)
        setDeleteConfirmationOpen(true)
    }

    const onDeleteConfirmationClose = () => {
        setSelectedImg({} as Image)
        setDeleteConfirmationOpen(false)
    }

    const onDelete = () => {
        onImageDelete?.(selectedImg)
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {imgList.map((img) => (
                <div
                    key={img.id}
                    className="group relative rounded border p-2 flex"
                >
                    <img
                        className="rounded max-h-[140px] max-w-full"
                        src={img.previewLink}
                        alt={img.filename}
                    />
                    <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                        <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => onViewOpen(img)}
                        >
                            <HiEye />
                        </span>
                        <span
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                            onClick={() => onDeleteConfirmation(img)}
                        >
                            <HiTrash />
                        </span>
                    </div>
                </div>
            ))}
            <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{selectedImg.filename}</h5>
                <img
                    className="w-full"
                    src={selectedImg.previewLink}
                    alt={selectedImg.filename}
                />
            </Dialog>
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove image"
                confirmButtonColor="red-600"
                onClose={onDeleteConfirmationClose}
                onRequestClose={onDeleteConfirmationClose}
                onCancel={onDeleteConfirmationClose}
                onConfirm={onDelete}
            >
                <p> Are you sure you want to remove this image? </p>
            </ConfirmDialog>
        </>
    )
}

const ProductImages = (props: ProductImagesProps) => {
    const { values } = props
    const currentValueImages = values.images
    const [uploading, setUploading] = useState(false)
    const [cropDialogOpen, setCropDialogOpen] = useState(false)
    const [cropImageSrc, setCropImageSrc] = useState('')
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [pendingCrop, setPendingCrop] = useState<PendingCropContext | null>(
        null
    )
    const [cropping, setCropping] = useState(false)

    const notifyUploadError = () => {
        toast.push(
            <Notification
                title="Tải ảnh thất bại"
                type="danger"
                duration={2500}
            >
                Không thể tải ảnh lên, vui lòng thử lại.
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    const readFileAsDataUrl = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error('FILE_READ_ERROR'))
            reader.readAsDataURL(file)
        })
    }

    const createImage = (url: string) => {
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
    ) => {
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

    const uploadImage = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        return await apiPostFormDataSystem<UploadImageResponse, FormData>(
            '/s3/upload',
            formData,
        )
    }

    const beforeUpload = (file: FileList | null) => {
        let valid: boolean | string = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize =  5 * 1024 * 1024

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

    const openCropDialog = async (
        file: File,
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>
    ) => {
        try {
            const imgSrc = await readFileAsDataUrl(file)
            setCropImageSrc(imgSrc)
            setPendingCrop({
                form,
                fieldName: field.name,
                file,
            })
            setCrop({ x: 0, y: 0 })
            setZoom(1)
            setCroppedAreaPixels(null)
            setCropDialogOpen(true)
        } catch (error) {
            console.error(error)
            notifyUploadError()
        }
    }

    const closeCropDialog = () => {
        if (cropping || uploading) {
            return
        }
        setCropDialogOpen(false)
        setPendingCrop(null)
        setCropImageSrc('')
        setCroppedAreaPixels(null)
    }

    const finalizeUpload = async (
        form: FormikProps<FormModel>,
        fieldName: string,
        file: File,
    ) => {
        setUploading(true)
        try {
            const existingImages = form.values.images ?? []
            const currentImages = cloneDeep(existingImages)
            let imageId = '1-img-0'
            if (currentImages.length > 0) {
                const prevImgId = currentImages[currentImages.length - 1].id
                const splitImgId = prevImgId.split('-')
                const newIdNumber =
                    parseInt(splitImgId[splitImgId.length - 1]) + 1
                splitImgId.pop()
                const newIdArr = [...splitImgId, ...[newIdNumber]]
                imageId = newIdArr.join('-')
            }
            const uploadResponse = await uploadImage(file)
            if (!uploadResponse) {
                throw new Error('UPLOAD_FAILED')
            }
            const image = {
                id: imageId,
                filename: uploadResponse.data.data.key,
                previewLink: uploadResponse.data.data.presignedUrl,
            }
            const imageList = [...currentImages, image]
            await form.setFieldValue(fieldName, imageList)
        } finally {
            setUploading(false)
        }
    }

    const handleCropConfirm = async () => {
        if (!pendingCrop || !croppedAreaPixels || !cropImageSrc) {
            return
        }
        setCropping(true)
        try {
            const croppedFile = await getCroppedFile(
                cropImageSrc,
                croppedAreaPixels,
                pendingCrop.file.name,
                pendingCrop.file.type
            )
            await finalizeUpload(
                pendingCrop.form,
                pendingCrop.fieldName,
                croppedFile,
            )
            closeCropDialog()
        } catch (error) {
            console.error(error)
            notifyUploadError()
        } finally {
            setCropping(false)
        }
    }

    const onUpload = async (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>,
        files: File[]
    ) => {
        if (!files.length) {
            return
        }
        const latestUpload = files[files.length - 1]
        await openCropDialog(latestUpload, form, field)
    }

    const handleImageDelete = (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>,
        deletedImg: Image
    ) => {
        const existingImages = form.values.images ?? []
        let imgList = cloneDeep(existingImages)
        imgList = imgList.filter((img) => img.id !== deletedImg.id)
        form.setFieldValue(field.name, imgList).then(() => {})
    }

    return (
        <AdaptableCard className="mb-4">
            <h5>Product Image</h5>
            <p className="mb-6">Add or change image for the product</p>
            <FormItem>
                <Field name="images">
                    {({ field, form }: FieldProps) => {
                        if (currentValueImages.length > 0) {
                            return (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                                    <ImageList
                                        imgList={currentValueImages}
                                        onImageDelete={(img: Image) =>
                                            handleImageDelete(form, field, img)
                                        }
                                    />
                                    <Upload
                                        draggable
                                        className="min-h-fit"
                                        beforeUpload={beforeUpload}
                                        showList={false}
                                        disabled={uploading || cropDialogOpen}
                                        onChange={(files) =>
                                            onUpload(form, field, files)
                                        }
                                    >
                                        <div className="max-w-full flex flex-col px-4 py-2 justify-center items-center">
                                            <DoubleSidedImage
                                                src="/img/others/upload.png"
                                                darkModeSrc="/img/others/upload-dark.png"
                                            />
                                            <p className="font-semibold text-center text-gray-800 dark:text-white">
                                                Upload
                                            </p>
                                            {uploading && (
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Đang tải ảnh...
                                                </p>
                                            )}
                                        </div>
                                    </Upload>
                                </div>
                            )
                        }

                        return (
                            <Upload
                                draggable
                                beforeUpload={beforeUpload}
                                showList={false}
                                disabled={uploading || cropDialogOpen}
                                onChange={(files) =>
                                    onUpload(form, field, files)
                                }
                            >
                                <div className="my-16 text-center">
                                    <DoubleSidedImage
                                        className="mx-auto"
                                        src="/img/others/upload.png"
                                        darkModeSrc="/img/others/upload-dark.png"
                                    />
                                    <p className="font-semibold">
                                        <span className="text-gray-800 dark:text-white">
                                            Drop your image here, or{' '}
                                        </span>
                                        <span className="text-blue-500">
                                            browse
                                        </span>
                                    </p>
                                    <p className="mt-1 opacity-60 dark:text-white">
                                        Support: jpeg, png
                                    </p>
                                    {uploading && (
                                        <p className="mt-2 text-sm text-gray-500">
                                            Đang tải ảnh...
                                        </p>
                                    )}
                                </div>
                            </Upload>
                        )
                    }}
                </Field>
            </FormItem>
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
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={(_, areaPixels) =>
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
                        onChange={(e) => setZoom(Number(e.target.value))}
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
        </AdaptableCard>
    )
}

export default ProductImages
