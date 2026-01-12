import { BlogResponse } from '@/@types/schema.blog.respone'
import { Button, Card, Dialog, Notification, Switcher, toast } from '@/components/ui'
import appConfig from '@/configs/app.config'
import BaseService from '@/services/BaseService'
import { useAppDispatch } from '@/store'
import { useState } from 'react'
import { HiPencil, HiStar, HiTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { setBlogs, useAppSelector } from '../store'

const BlogImage = ({ filename, blog }: { filename: string, blog: BlogResponse; size?: number }) => {
    return (
        <img
            src={`${appConfig.apiPrefix}/s3/stream?fileName=${filename}&v=${Date.parse(blog.updatedAt) || 0}`}
            alt={filename}
            className="w-full h-full object-cover"
            loading="lazy"
        />
    )
}



const BlogCard = ({ blog }: { blog: BlogResponse }) => {
    const dispatch = useAppDispatch()
    const { blogs } = useAppSelector((state) => state.salesBlogPostList.data)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const handleSetFeatured = async (uid: string, featured: boolean) => {
        await BaseService.get(`${appConfig.apiPrefix}/blogs/featured/${uid}?featured=${featured}`)
        const updatedBlogs = blogs.map(b =>
            b.id === uid ? { ...b, featured: featured } : b
        )

        dispatch(setBlogs(updatedBlogs))
    }

    const handleSetEnabled = async (uid: string, enabled: boolean) => {
        await BaseService.get(`${appConfig.apiPrefix}/blogs/enabled/${uid}?enabled=${enabled}`)
        const updatedBlogs = blogs.map(b =>
            b.id === uid ? { ...b, enabled: enabled } : b
        )

        dispatch(setBlogs(updatedBlogs))
    }

    const onDelete = () => {
        setDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        setDeleting(true)
        try {
            await BaseService.delete(`${appConfig.apiPrefix}/blogs/delete/${blog.id}`)
            const updatedBlogs = blogs.filter(b => b.id !== blog.id)
            dispatch(setBlogs(updatedBlogs))
            setDeleteDialogOpen(false)
            toast.push(
                <Notification title="Xóa thành công" type="success">
                    Blog đã được xóa thành công.
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        } catch (error) {
            console.error(error)
            toast.push(
                <Notification title="Xóa thất bại" type="danger">
                    Không thể xóa blog, vui lòng thử lại.
                </Notification>,
                {
                    placement: 'top-center',
                },
            )
        } finally {
            setDeleting(false)
        }
    }

    const getContentTypeBadgeClass = (contentType: string) => {
        switch (contentType) {
            case "NEWS":
                return "bg-red-600";
            case "GUIDE":
                return "bg-blue-600";
            case "SHARING":
                return "bg-green-600";
            case "COMPARISON":
                return "bg-purple-600";
            default:
                return "bg-gray-500";
        }
    };

    const getUiTypeConfig = (uiType: string) => {
        switch (uiType) {
            case "NEWS":
                return "bg-red-700"
            case "BLOG":
                return "bg-indigo-800"
            default:
                "bg-gray-500"
        }
    };

    return (
        <Card bodyClass={`h-full rounded-md ${blog.enabled ? '': 'bg-gray-100 dark:bg-gray-700'}`}>
            <div className='relative h-full'>
                <div className={`z-20 absolute top-4 right-4 text-white px-2 py-1 rounded-bl-lg font-medium text-sm  ${getContentTypeBadgeClass(blog?.contentType)}`}>
                    {blog?.contentType || "Unknown"}
                </div>
                <div className='flex flex-col justify-between h-full'>
                    <div className="flex flex-col gap-4">

                        {blog.image && (
                            <div className="w-full h-64 overflow-hidden rounded-xl">
                                <BlogImage filename={blog.image} blog={blog} />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold text-gray-200 line-clamp-2">
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
                            <div>
                                <div className={`text-white px-2 py-1 rounded-l-lg font-medium text-sm  ${getUiTypeConfig(blog?.uiType)}`}>
                                    {blog?.uiType || "Unknown"}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 min-h-[50px]">
                            {
                                blog.tags.map((tag, idx) => (
                                    <span key={idx} className="inline-flex items-center px-3 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors h-[24px]">
                                        {tag.translations[0]?.name}
                                    </span>
                                ))
                            }
                        </div>


                    </div>
                    <div>
                        <div className="flex justify-between pt-2 border-t items-center">
                            <div className='flex items-center'>
                                <Button
                                    variant="plain"
                                    size="sm"
                                    icon={<HiStar size={25} className={`${blog.featured ? "text-yellow-500" : ""}`} />}
                                    onClick={() => handleSetFeatured(blog.id, !blog.featured)}
                                />
                                <Switcher checked={blog.enabled} onChange={(el) => {
                                    console.log(el)
                                    handleSetEnabled(blog.id, !el)
                                }} />
                            </div>

                            <div className='flex justify-end gap-2'>
                                <Link to={`/app/sales/blog-post/${blog.id}`}>
                                    <Button
                                        variant="plain"
                                        size="sm"
                                        icon={<HiPencil />}
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </Link>
                                <Button
                                    variant="plain"
                                    size="sm"
                                    icon={<HiTrash />}
                                    onClick={onDelete}
                                >
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                width={400}
            >
                <h5 className="mb-4">Xác nhận xóa</h5>
                <p>
                    Bạn có chắc chắn muốn xóa blog "{blog.translations[0]?.title}"?
                    Hành động này không thể hoàn tác.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={() => setDeleteDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleConfirmDelete} color="red-600">
                        Xóa
                    </Button>
                </div>
            </Dialog>
        </Card>
    )
}
export default BlogCard
