import { injectReducer, useAppDispatch } from '@/store';
import reducer, { searchBlogTags, useAppSelector } from '@/views/blogs/AttributeList/store';
import { Fragment, useEffect } from "react";
import TagList from './components/Tag/TagList/TagList';
import CategoryList from './components/Category/CategoryList/CategoryList';

injectReducer('salesBlogAttributeList', reducer)
const AttributeList = () => {
    const dispatch = useAppDispatch();
    const { tags } = useAppSelector((state) => state.salesBlogAttributeList.data);
    useEffect(() => {
        dispatch(searchBlogTags())
    }, [])

    return (
        <Fragment>
            <div className='grid grid-cols-2 justify-center gap-4 h-full'>
                <div className='flex justify-center'>
                    <TagList />
                </div>
                <div className='flex justify-center'>
                    <CategoryList />
                </div>
            </div>
        </Fragment>
    )
}
export default AttributeList;