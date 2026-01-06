import { injectReducer, useAppDispatch } from '@/store';
import reducer, { searchBlogTags, useAppSelector } from '@/views/blogs/AttributeList/store';
import { Fragment, useEffect } from "react";
import TagList from './components/Tag/TagList/TagList';

injectReducer('salesBlogAttributeList', reducer)
const AttributeList = () => {
    const dispatch = useAppDispatch();
    const { tags } = useAppSelector((state) => state.salesBlogAttributeList.data);
    useEffect(() => {
        dispatch(searchBlogTags())
    }, [])

    return (
        <Fragment>
            <TagList />
        </Fragment>
    )
}
export default AttributeList;