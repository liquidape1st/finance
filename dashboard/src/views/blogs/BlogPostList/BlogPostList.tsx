import { Button } from '@/components/ui'
import { injectReducer, useAppDispatch } from '@/store'
import BlogCard from '@/views/blogs/BlogPostList/components/BlogCard'
import reducer, { searchBlogPosts, setIsOpenManageAttribute, useAppSelector } from '@/views/blogs/BlogPostList/store'
import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AttributeList from '../AttributeList/AttributeList'

injectReducer('salesBlogPostList', reducer)
const BlogPostList = () => {
    const { blogs, isOpenManageAttribute } = useAppSelector((state) => state.salesBlogPostList.data)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(searchBlogPosts())
    }, [dispatch])
    return (
        <Fragment>
            <div className={"flex justify-end mb-4 gap-4"}>
                <div>
                    <Button
                        variant={"solid"}
                        size={"sm"}
                        className={`${isOpenManageAttribute ? 'hidden' : ''}`}
                        onClick={() => {
                            dispatch(setIsOpenManageAttribute(true))

                        }}>
                        Quản lý thuộc tính
                    </Button>
                    <Button
                        variant={"solid"}
                        size={"sm"}
                        className={`${!isOpenManageAttribute ? 'hidden' : ''}`}
                        onClick={() => {
                            dispatch(setIsOpenManageAttribute(false))

                        }}>
                        Quản lý bài viết
                    </Button>
                </div>
                <Link to={"/app/sales/blog-post"}>
                    <Button variant={"solid"} size={"sm"} className={`${isOpenManageAttribute ? 'hidden' : ''}`}>
                        Thêm mới bài viết
                    </Button>
                </Link>
            </div>
            {
                !isOpenManageAttribute ? (
                    <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 gap-4'}>
                        {blogs.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <AttributeList/>
                )
            }

        </Fragment>
    )
}
export default BlogPostList
