import { useEffect } from 'react'
import { Card, Row, Col, Input, Button, Form, Radio, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { orderProductAction } from '../../../redux/actions';

function CheckoutPage() {
  const [checkoutForm] = Form.useForm();

  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data.id]);

  function handleOrder(values) {
    dispatch(orderProductAction({
      id: userInfo.data.id,
      data: {
        userId: userInfo.data.id,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        products: cartList.data,
        totalPrice,
        checkoutInfo: values.checkoutInfo,
        status: 'waiting',
      }
    }))
  }

  function renderCartItems() {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = totalPrice + cartItem.price * cartItem.count;
      return (
        <Row key={`cart-${cartItem.id}`} style={{ marginBottom: 8 }}>
          <Col span={8}>
            {cartItem.name}
          </Col>
          <Col span={6}>
            {cartItem.price.toLocaleString()}
          </Col>
          <Col span={4}>
            {cartItem.count}
          </Col>
          <Col span={6}>
            {(cartItem.price * cartItem.count).toLocaleString()}
          </Col>
        </Row>
      );
    })
  }

  return (
    <div style={{ padding: 24 }}>
      Checkout Page
      <Form
        form={checkoutForm}
        name="basic"
        layout="vertical"
        initialValues={{ 
          name: userInfo.data.name,
          email: userInfo.data.email,
        }}
        onFinish={(values) => handleOrder(values)}
      >
        <Card title="Thông tin đơn hàng" size="small">
          {renderCartItems()}
        </Card>
        <Card title="Thông tin cá nhân" size="small" style={{ margin: '16px 0' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Thông tin thanh toán" size="small">
          <Form.Item name="checkoutInfo">
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="momo">Momo</Radio>
                <Radio value="zalo">Zalo Pay</Radio>
                <Radio value="atm">Thẻ ATM</Radio>
                <Radio value="visa">Thẻ VISA, Master, JCB</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Button
          htmlType="submit"
          type="primary"
          style={{ marginTop: 16 }}
        >
          Thanh Toán
        </Button>
      </Form>
    </div>
  );
}

export default CheckoutPage;
