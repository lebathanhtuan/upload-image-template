import { useState, useEffect } from 'react';
import { Button, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import history from '../../../utils/history';

import {
  getProductDetailAction,
  addToCartAction,
} from '../../../redux/actions';

function ProductDetailPage({ match }) {
  const [productCount, setProductCount] = useState(1);

  const productId = parseInt(match.params.id);

  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, []);

  function handleAddToCart() {
    const cartData = [...cartList.data];
    const cartIndex = cartData.findIndex((item) => item.productId === productId);
    if (cartIndex !== -1) {
      cartData.splice(cartIndex, 1, {
        ...cartData[cartIndex],
        count: cartData[cartIndex].count + productCount,
      });
      dispatch(addToCartAction({
        id: userInfo.data.id,
        data: { cart: cartData },
      }));
    } else {
      const newCartData = [
        ...cartData,
        {
          id: uuidv4(),
          productId: productId,
          name: productDetail.data.name,
          price: productDetail.data.price,
          count: productCount,
        }
      ]
      dispatch(addToCartAction({
        id: userInfo.data.id,
        data: { cart: newCartData },
      }));
    }
    
  }

  return (
    <>
      <Button onClick={() => history.goBack()}>
        Quay lại
      </Button>
      <div>Tên sản phẩm: {productDetail.data.name}</div>
      <div>Hãng: {productDetail.data.category?.name}</div>
      <div>
        Giá: {productDetail.data.price >= 0 && productDetail.data.price.toLocaleString()}
      </div>
      <InputNumber
        min={1}
        onChange={(value) => setProductCount(value)}
        value={productCount}
      />
      <div>
        <Button type="primary" onClick={() => handleAddToCart()}>
          Thêm vào giỏ
        </Button>
      </div>
    </>
  );
}

export default ProductDetailPage;
