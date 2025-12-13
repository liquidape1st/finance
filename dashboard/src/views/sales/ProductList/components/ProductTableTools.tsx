import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    setOpenProductFormDialog,
    setSelectedDialog,
} from '@/views/sales/ProductList/store'

const ProductTableTools = () => {
    const dispatch = useDispatch()
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProductTableSearch />
            <ProductFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Button
                block
                variant="solid"
                size="sm"
                className={'block lg:inline-block md:mx-2 md:mb-0 mb-4'}
                icon={<HiPlusCircle />}
                onClick={() => {
                    dispatch(setSelectedDialog('CREATE'))
                    dispatch(setOpenProductFormDialog(true))
                }}
            >
                Add Product
            </Button>
        </div>
    )
}

export default ProductTableTools
