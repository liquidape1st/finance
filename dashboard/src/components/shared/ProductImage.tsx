import { useEffect, useState } from 'react'
import BaseService from '@/services/BaseService'
import isEmpty from 'lodash/isEmpty'
import Avatar from '../ui/Avatar'
import { FiPackage } from 'react-icons/fi'

const ProductImage = ({
    filename,
    size = 20,
}: {
    filename: string
    size?: number
}) => {
    const [previewUrl, setPreviewUrl] = useState('')

    useEffect(() => {
        const fetchPreview = async () => {
            if (!isEmpty(filename)) {
                try {
                    const res = await BaseService.get(
                        `/s3/sign?fileName=${filename}`,
                    )
                    setPreviewUrl(res.data.data)
                } catch (err) {
                    console.error(err)
                }
            }
        }
        fetchPreview().then(() => {})
    }, [filename])

    const avatar =
        !isEmpty(filename) && previewUrl ? (
            <Avatar src={previewUrl} size={size} />
        ) : (
            <Avatar icon={<FiPackage />} size={size} />
        )

    return <>{avatar}</>
}
export default ProductImage
