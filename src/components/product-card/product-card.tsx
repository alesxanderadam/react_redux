import { HeartOutlined } from '@ant-design/icons'
import { ProductModel, RelatedProduct } from '../../models/product.model'
import './product-card.scss'
import { Link } from 'react-router-dom';
import { PageConstant } from '../../common/page.constant';
import { useDispatch } from 'react-redux';
import { addProductToCardAction } from '../../redux/products-reducer/product-reducer';
import { DispatchType } from '../../redux/config-store';
import { ACCESS_TOKEN, settings } from '../../util/config';
import { message } from 'antd';

type Props = {
    product?: ProductModel | RelatedProduct
}

const ProductCard = ({ product }: Props) => {
    const sizes = product.size.slice(1, -1).split(",");
    const dispatch: DispatchType = useDispatch();

    const handleAddToCart = () => {
        if (settings.getStore(ACCESS_TOKEN)) {
            dispatch(addProductToCardAction(product))
        } else {
            message.warning("Chưa đăng nhập")
            // history.push(`${PageConstant.login}`)
        }
    }
    return (
        <div className="product">
            <div className={`product__card`}>
                <div className="card__heart">
                    <HeartOutlined style={{ color: 'red' }} />
                </div>
                <h2 className='price__product'>${product.price}</h2>
                <div className="card__img-product">
                    <img className='img' height={"190px"} src={product.image} alt="image__product1" />
                </div>
                <div className="card__text-product">
                    <h2>{product.name}</h2>
                </div>
            </div>
            <div className="product__buy">
                <div className="size__product pb-3">
                    <h2>Size :</h2>
                    {sizes.map((item: number, index: number) => <span key={index}>{item}</span>)}
                </div>
                <div className="btn__product">
                    <button><Link style={{ textDecoration: 'none' }} to={`${PageConstant.detail}/${product.id}`}>Buy now</Link></button>
                    <button onClick={handleAddToCart}>Add cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
