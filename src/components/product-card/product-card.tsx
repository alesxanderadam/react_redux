import { ProductDetailModel, ProductModel, RelatedProduct } from '../../models/product.model'
import './product-card.scss'
import { PageConstant } from '../../common/page.constant';
import { useDispatch } from 'react-redux';
import { addProductToCardAction, productsUserLikeApi } from '../../redux/products-reducer/product-reducer';
import { DispatchType } from '../../redux/config-store';
import { ACCESS_TOKEN, settings } from '../../util/config';
import { message } from 'antd';
import { history } from '../../app';
import { useNavigate } from 'react-router-dom';

type Props = {
    product?: ProductModel | RelatedProduct | ProductDetailModel
}

const ProductCard = ({ product }: Props) => {
    const dispatch: DispatchType = useDispatch();
    const navigate = useNavigate();

    const sizes = product.size.slice(1, -1).split(",");

    const handleAddToCart = () => {
        if (settings.getStore(ACCESS_TOKEN)) {
            dispatch(addProductToCardAction(product))
        } else {
            message.warning("Login ?")
            history.push(`${PageConstant.login}`)
        }
    }
    return (
        <div>
            <div className="about_card_product">
                <div className="images">
                    <img src={product.image} alt={product.image} />
                </div>
                <div className="slideshow-buttons">
                    <div className="one" />
                    <div className="two" />
                    <div className="three" />
                    <div className="four" />
                </div>
                <p className="pick">choose size</p>
                <div className="sizes">
                    {sizes?.map((item: number, index: number) => {
                        return <div className='size' key={index}>{item}</div>
                    })}
                </div>
                <div className="product">
                    <p>Women's Running Shoe</p>
                    <h1>{product.name}</h1>
                    <h2>${product.price}</h2>
                    <p className="desc">{product.description}</p>
                    <div className="buttons">
                        <button className="add" onClick={handleAddToCart}>Add to Cart</button>
                        <button className="like"
                            onClick={() => {
                                dispatch(productsUserLikeApi(product.id))
                            }}><span>♥</span></button>
                        <p className='view_detail_products mt-3' onClick={() => {
                            navigate(`${PageConstant.detail}/${product.id}`)
                        }}>View detail product</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
