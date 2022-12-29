import { NavLink } from 'react-router-dom'
import { PageConstant } from '../../common/page.constant'
import { ProductModel, RelatedProduct } from '../../models/product.model'

type Props = {
    product?: ProductModel | RelatedProduct
}

const ProductCard = ({ product }: Props) => {

    return (
        <div className='card mt-3' style={{ height: '650px' }}>
            <div className='icon position-relative'>
                <i className='fa fa-heart position-absolute top-0 end-0 right-0 mt-2 mx-2' style={{ fontSize: '20px', color: 'red' }}></i>
                <img className='w-100' src={product?.image ? product.image : 'https://i.pravatar.cc?u=2'} alt='...'></img>
            </div>
            <div className='card-body'>
                <h2 className='card-title'>{product?.name ? product.name : 'Product name'}</h2>
                <p>{product?.description.length > 100 ? product?.description.substr(0, 100) + '...' : product?.description}</p>
            </div>
            <div className='d-flex'>
                <NavLink to={`${PageConstant.detail}/${product?.id}`} className='btn btn-success w-50' style={{ borderRadius: '0px' }}>Buy now</NavLink>
                <div className='product-price text-center bg-secondary w-50 text-dark' style={{ lineHeight: '40px' }}>
                    {product?.price ? product.price.toFixed() : 'price'}
                </div>
            </div>
        </div>
    )
}

export default ProductCard