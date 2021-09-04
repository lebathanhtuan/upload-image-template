import { useEffect } from 'react';
import { Form, Input, Button, Checkbox, } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { loginAction } from '../../redux/actions';

function LoginPage({ history }) {
  const { responseAction } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [loginForm] = Form.useForm();

  const prevPath = history.location.state?.prevPath;

  useEffect(() => {
    if (responseAction.login.error) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' ']
        },
        {
          name: 'password',
          errors: [responseAction.login.error]
        },
      ]);
    }
  }, [responseAction.login])

  function handleSubmit(values) {
    dispatch(loginAction({
      data: values,
      prevPath,
    }));
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-title">
          <h2>Login</h2>
        </div>
        <Form
          form={loginForm}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Bạn chưa nhập email!" },
              { type: 'email', message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Bạn chưa nhập tài khoản!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Ghi nhớ tài khoản</Checkbox>
          </Form.Item>
          
          <div style={{ display: 'inline-block', marginBottom: 16 }}>
            Bạn chưa có tài khoản?&nbsp;
            <Link to="/register">
              Bấm vào đây để đăng ký
            </Link>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={responseAction.login.load}
          >
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
