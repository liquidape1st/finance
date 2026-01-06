import { injectReducer, useAppDispatch } from '@/store';
import reducer, { searchBlogTags, useAppSelector } from '@/views/blogs/AttributeList/store'
import { Fragment, useEffect } from "react"
import TagList from './components/TagList/TagList';

injectReducer('salesBlogAttributeList', reducer)
const AttributeList = () => {
    const dispatch = useAppDispatch();
    const { tags } = useAppSelector((state) => state.salesBlogAttributeList.data);
    useEffect(() => {
        dispatch(searchBlogTags())
    }, [])

    return (
        <Fragment>
            <div>Attribute List</div>
            <div>
                <div className='grid grid-cols-2'>
                    <TagList />
                </div>
            </div>

        </Fragment>
    )
}
export default AttributeList;