import { Card, Row, Col, Input, Button, notification } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import history from '../../../utils/history';

import {
  minusItemCountAction,
  plusItemCountAction,
  deleteCartItemAction,
} from '../../../redux/actions';

function CartPage() {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  function handlePlusCount(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count + 1,
    });
    dispatch(plusItemCountAction({
      id: userInfo.data.id,
      data: { cart: newCartData },
    }));
  }

  function handleMinusCount(index) {
    if (cartList.data[index].count === 1) return null;
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count - 1,
    });
    dispatch(minusItemCountAction({
      id: userInfo.data.id,
      data: { cart: newCartData },
    }));
  }

  function handleDeleteItem(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1);
    dispatch(deleteCartItemAction({
      id: userInfo.data.id,
      data: { cart: newCartData },
    }));
  }

  function handleCheckout() {
    if (!userInfo.data.id) {
      notification.warn({
        message: 'Bạn chưa đăng nhập',
      });
    } else {
      history.push('/checkout');
    }
  }

  function renderCartItems() {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = totalPrice + cartItem.price * cartItem.count;
      return (
        <Card key={`cart-${cartItem.id}`} size="small" style={{ marginBottom: 8 }}>
          <Row>
            <Col span={8}>
              {cartItem.name}
            </Col>
            <Col span={4}>
              {cartItem.price.toLocaleString()}
            </Col>
            <Col span={6}>
              <Input.Group compact>
                <Button
                  icon={<MinusOutlined />}
                  onClick={() => handleMinusCount(cartIndex)}
                />
                <Input value={cartItem.count} readOnly style={{ width: 40, textAlign: 'center' }} />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => handlePlusCount(cartIndex)}
                />
              </Input.Group>
            </Col>
            <Col span={4}>
              {(cartItem.price * cartItem.count).toLocaleString()}
            </Col>
            <Col span={2}>
              <Button
                type="text"
                danger
                icon={<CloseOutlined />}
                onClick={() => handleDeleteItem(cartIndex)}
              />
            </Col>
          </Row>
        </Card>
      );
    })
  }

  function renderCartList() {
    if (!userInfo.data.id) {
      return <div>Bạn cần đăng nhập để thêm vào giỏ</div>
    } else if (cartList.data.length > 0) {
      return (
        <>
          {renderCartItems()}
          <Row justify="end">
            Tổng: {totalPrice.toLocaleString()}
          </Row>
          <Button onClick={() => handleCheckout()}>Thanh Toán</Button>
        </>
      )
    } else {
      return <div>Giỏ hàng trống</div>
    }
  }

  return (
    <div style={{ padding: 24 }}>
      Cart Page
      {renderCartList()}
    </div>
  );
}

export default CartPage;
