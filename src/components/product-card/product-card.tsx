import { HeartOutlined } from '@ant-design/icons'
import { ProductModel, RelatedProduct } from '../../models/product.model'
import './product-card.scss'
type Props = {
    product?: ProductModel | RelatedProduct
}

const ProductCard = ({ product }: Props) => {
    const sizes = product.size.slice(1, -1).split(",");
    return (
        <div className="product">
            <div className="product__card">
                <div className="card__heart">
                    <HeartOutlined />
                </div>
                <div className="card__img-product">
                    <img className='img' height={"190px"} src={product.image} alt="image__product1" />
                </div>
                <div className="card__text-product">
                    <h2>{product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name}</h2>
                    <h2>${product.price}</h2>
                </div>
            </div>
            <div className="product__buy">
                <div className="size__product pb-3">
                    <h2>Size:</h2>
                    {sizes.map((item: number, index: number) => <span key={index}>{item}</span>)}
                </div>
                <div className="color__product">
                    <h2>Color :</h2>
                    <span className="card__color-green" />
                    <span className="card__color-red" />
                    <span className="card__color-black" />
                </div>
                <div className="btn__product">
                    <button>Buy now</button>
                    <button>Add cart</button>
                </div>
            </div>
        </div>


    )
}

export default ProductCard