import { Button, Input, Spinner } from '@/components/ui'
import { injectReducer, useAppDispatch } from '@/store'
import BlogCard from '@/views/blogs/BlogPostList/components/BlogCard'
import reducer, { searchBlogPosts, setIsOpenManageAttribute, resetBlogs, setTableData, useAppSelector } from '@/views/blogs/BlogPostList/store'
import { Fragment, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import AttributeList from '../AttributeList/AttributeList'
import DatePicker from '@/components/ui/DatePicker'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'

const { DatePickerRange } = DatePicker

injectReducer('salesBlogPostList', reducer)
const BlogPostList = () => {
    const { blogs, isOpenManageAttribute, tableData, loading, hasMore } = useAppSelector((state) => state.salesBlogPostList.data)
    const dispatch = useAppDispatch()
    const observerTarget = useRef<HTMLDivElement>(null)
    const prevQueryRef = useRef<string | undefined>(undefined)
    const prevSortRef = useRef<TableQueries['sort'] | undefined>(undefined)
    const isMountedRef = useRef(false)

    // Load initial data when query or sort changes
    useEffect(() => {
        const queryChanged = prevQueryRef.current !== tableData.query
        const sortChanged = JSON.stringify(prevSortRef.current) !== JSON.stringify(tableData.sort)
        
        if (!isMountedRef.current || queryChanged || sortChanged) {
            dispatch(resetBlogs())
            const initialTableData = cloneDeep(tableData)
            initialTableData.pageIndex = 1
            dispatch(setTableData(initialTableData))
            dispatch(searchBlogPosts(initialTableData))
            prevQueryRef.current = tableData.query
            prevSortRef.current = tableData.sort
            isMountedRef.current = true
        }
    }, [dispatch, tableData.query, tableData.sort])

    // Load more when pageIndex changes (triggered by scroll)
    useEffect(() => {
        const currentPageIndex = tableData.pageIndex || 1
        if (currentPageIndex > 1) {
            dispatch(searchBlogPosts(tableData))
        }
    }, [dispatch, tableData.pageIndex])

    // Infinite scroll observer
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries
        if (target.isIntersecting && hasMore && !loading && !isOpenManageAttribute) {
            const nextPageData = cloneDeep(tableData)
            nextPageData.pageIndex = (nextPageData.pageIndex || 1) + 1
            dispatch(setTableData(nextPageData))
        }
    }, [hasMore, loading, tableData, dispatch, isOpenManageAttribute])

    useEffect(() => {
        const element = observerTarget.current
        const option = {
            threshold: 0.1,
            rootMargin: '100px'
        }

        const observer = new IntersectionObserver(handleObserver, option)
        if (element) observer.observe(element)

        return () => {
            if (element) observer.unobserve(element)
        }
    }, [handleObserver])
    return (
        <Fragment>
            <div className='flex justify-between'>
                <div>
                </div>
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
            </div>
            {
                !isOpenManageAttribute ? (
                    <>
                        <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 gap-4'}>
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                        <div ref={observerTarget} className="flex justify-center py-4">
                            {loading && (
                                <Spinner size={40} />
                            )}
                            {!hasMore && blogs.length > 0 && (
                                <p className="text-gray-500 text-sm">Đã hiển thị tất cả bài viết</p>
                            )}
                        </div>
                    </>
                ) : (
                    <AttributeList />
                )
            }
        </Fragment>
    )
}
export default BlogPostList
