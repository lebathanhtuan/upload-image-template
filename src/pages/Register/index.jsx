import { useEffect } from 'react';
import { Form, Input, Select, Button, Checkbox } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { registerAction } from '../../redux/actions';

function RegisterPage() {
  const { responseAction } = useSelector((state) => state.userReducer);
  console.log('🚀 ~ file: index.jsx ~ line 14 ~ RegisterPage ~ responseAction', responseAction);
  const dispatch = useDispatch();

  const [registerForm] = Form.useForm();
  
  useEffect(() => {
    if (responseAction.register.error) {
      registerForm.setFields([
        {
          name: 'email',
          errors: [responseAction.register.error]
        },
      ]);
    }
  }, [responseAction.register])

  function handleSubmit(values) {
    dispatch(registerAction({
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        cart: [],
        role: 'user',
      },
    }));
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-title">
          <h2>Register</h2>
        </div>
        <Form
          form={registerForm}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Bạn chưa nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Bạn chưa nhập giới tính!" }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Bạn chưa nhập mật khẩu!" },
              { min: 6, max: 16, message: "Mật khẩu phải từ 6-16 kí tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="prePassword"
            rules={[
              { required: true, message: 'Bạn chưa xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu xác nhận không đúng!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
          >
            <Checkbox>Đồng ý với các điều khoản</Checkbox>
          </Form.Item>

          <div style={{ display: 'inline-block', marginBottom: 16 }}>
            Bạn đã có tài khoản?&nbsp;
            <Link to="/login">
              Đăng nhập
            </Link>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={responseAction.register.load}
          >
            Đăng kí
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
