import { useEffect } from 'react'
import { Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/config-store'
import utils from '../../util/formater-number'
import { getListProductSearchApi, getListProductSearchByPriceApi } from '../../redux/products-reducer/product-reducer'
import ProductCard from '../../components/product-card/product-card'
import './search.scss'

const Search = () => {
    const dispatch: DispatchType = useDispatch()
    const { searchResult } = useSelector((state: RootState) => state.productReducer)
    const onSearch = (value: string) => {
        const getListProductSearch = getListProductSearchApi(utils.$common.converVietNamese(value))
        dispatch(getListProductSearch)
    }
    const handleChange = (value: number) => {
        dispatch(getListProductSearchByPriceApi(value))
    }

    return (
        <div>
            <div className='search-page'>
                <div className="my-1" style={{ color: "pink", fontWeight: "bold" }}>
                    <h1>Search</h1>
                </div>
                <Input.Search
                    className='input-form-login'
                    style={{ borderRadius: '5px' }}
                    placeholder="Product name"
                    allowClear
                    enterButton="Search"
                    size="middle"
                    onSearch={onSearch}
                />
            </div>
            <div className='container mb-5' style={{ marginBottom: '100px' }}>
                <Select
                    onChange={handleChange}
                    style={{ width: '200px' }}
                    onSearch={onSearch}
                    showSearch={true}
                    placeholder="Chose price you want"
                >
                    {Array.from(new Set(searchResult?.map(item => item.price))) // Tao Array tam để lọc giá trị giống nhau => set
                        .sort((a, b) => a - b)
                        .map((price, index) => (
                            <Select.Option key={index} value={price}>
                                {price}
                            </Select.Option>
                        ))}
                </Select>
                <div className='row mt-4'>
                    {searchResult?.map((prod, index) => {
                        return <div className="col-xxl-4 col-md-6 mt-5 p-0" key={index}>
                            <ProductCard product={prod} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Search
