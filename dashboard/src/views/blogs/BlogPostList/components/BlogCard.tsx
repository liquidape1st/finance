import { Card, Button } from '@/components/ui'
import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import BaseService from '@/services/BaseService'
import { Link } from 'react-router-dom'
import { HiPencil } from 'react-icons/hi'
import { BlogResponse } from '@/@types/schema.blog.respone'

const BlogImage = ({ filename }: { filename: string; size?: number }) => {
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

    return (
        <img
            src={previewUrl}
            alt={filename}
            className="w-full h-full object-cover"
            loading="lazy"
        />
    )
}

const BlogCard = ({ blog }: { blog: BlogResponse }) => {
    return (
        <Card>
            <div className="flex flex-col gap-4">
                {blog.image && (
                    <div className="w-full h-64 overflow-hidden rounded-xl">
                        <BlogImage filename={blog.image} />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                        {blog.translations[0]?.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-3">
                        {blog.translations[0]?.excerpt}
                    </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
                    <span>
                        {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="font-medium text-gray-600">
                        {blog.author}
                    </span>
                </div>

                <div className="flex justify-end pt-2 border-t">
                    <Link to={`/app/sales/blog-post/${blog.id}`}>
                        <Button
                            variant="plain"
                            size="sm"
                            icon={<HiPencil />}
                        >
                            Chỉnh sửa
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}
export default BlogCard
