import { Fragment, useEffect } from 'react'
import { injectReducer, useAppDispatch } from '@/store'
import reducer, { searchBlogPosts, useAppSelector } from '@/views/blogs/BlogPostList/store'
import BlogCard from '@/views/blogs/BlogPostList/components/BlogCard'
import { Button } from '@/components/ui'
import { Link } from 'react-router-dom'

injectReducer('salesBlogPostList', reducer)
const BlogPostList = () => {
    const { blogs } = useAppSelector((state) => state.salesBlogPostList.data)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(searchBlogPosts())
    }, [dispatch])
    return (
        <Fragment>
            <div className={"flex justify-end"}>
                <Link to={"/app/sales/blog-post"}>
                    <Button variant={"solid"} size={"sm"}>
                        Thêm mới
                    </Button>
                </Link>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7 3xl:grid-cols-7 gap-4'}>
                {blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                ))}
            </div>
        </Fragment>
    )
}
export default BlogPostList
