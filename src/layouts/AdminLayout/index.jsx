import { useState } from 'react';
import { Route, Redirect } from "react-router-dom";

import Header from '../Header';
import Sidebar from '../Sidebar';

import * as Style from './styles';

function AdminLayout({ exact, path, component: Component }) {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Redirect to="/login" />
  } else {
    if (userInfo.role === 'user') {
      return <Redirect to="/" />
    } else {
      return (
        <Route
          exact={exact}
          path={path}
          render={(routeProps) => {
            return (
              <>
                <Header
                  type="admin"
                  isShowSidebar={isShowSidebar}
                  setIsShowSidebar={setIsShowSidebar}
                />
                <Style.AdminContainer>
                  <Sidebar {...routeProps} isShowSidebar={isShowSidebar} />
                  <Style.AdminContent show={isShowSidebar}>
                    <Style.MainContainer>
                      <Component {...routeProps} />
                    </Style.MainContainer>
                  </Style.AdminContent>
                </Style.AdminContainer>
              </>
            )
          }}  
        />
      );
    }
  }
}

export default AdminLayout;
