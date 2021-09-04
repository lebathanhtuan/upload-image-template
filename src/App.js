import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Switch } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import jwtDecode from "jwt-decode";

import history from './utils/history';
import i18n from './utils/locales/i18n';

import DefaultLayout from './layouts/DefaultLayout';
import AdminLayout from './layouts/AdminLayout';
import FullLayout from './layouts/FullLayout';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import NotFoundPage from './pages/NotFound';

import HomePage from './pages/user/Home';
import AboutPage from './pages/user/About';
import ProductDetailPage from './pages/user/ProductDetail';
import CartPage from './pages/user/Cart';
import CheckoutPage from './pages/user/Checkout';

import DashboardPage from './pages/admin/Dashboard';
import ProductListPage from './pages/admin/ProductList';
import ModifyProductPage from './pages/admin/ModifyProduct';
import CategoryListPage from './pages/admin/CategoryList';
import ToDoListPage from './pages/admin/ToDoList';

import {
  getUserInfoAction,
} from './redux/actions'

import { lightTheme, darkTheme } from './styles/themes';

import './App.css';
import 'antd/dist/antd.css';

const THEME = {
  light: lightTheme,
  dark: darkTheme,
}

function App(props) {
  const { theme } = useSelector((state) => state.commonReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      const decodedUserInfo = jwtDecode(userInfo.accessToken);
      dispatch(getUserInfoAction({ id: decodedUserInfo.sub }));
    }
  }, []);

  return (
    <ThemeProvider theme={THEME[theme]}>
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <Switch>
            <DefaultLayout exact path="/" component={HomePage} />
            <DefaultLayout exact path="/about" component={AboutPage} />
            <DefaultLayout exact path="/product/:id" component={ProductDetailPage} />
            <DefaultLayout exact path="/cart" component={CartPage} />
            <DefaultLayout exact path="/checkout" component={CheckoutPage} />
          
            <AdminLayout exact path="/admin" component={DashboardPage} />
            <AdminLayout exact path="/admin/products" component={ProductListPage} />
            <AdminLayout exact path="/admin/product/create" component={ModifyProductPage} />
            <AdminLayout exact path="/admin/product/:id/edit" component={ModifyProductPage} />
            <AdminLayout exact path="/admin/categories" component={CategoryListPage} />
            <AdminLayout exact path="/admin/to-do-list" component={ToDoListPage} />

            <FullLayout exact path="/login" component={LoginPage} />
            <FullLayout exact path="/register" component={RegisterPage} />
            <FullLayout component={NotFoundPage} />
          </Switch>
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
