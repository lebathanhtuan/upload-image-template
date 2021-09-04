import { Route } from "react-router-dom";

import Header from '../Header';
import Footer from '../Footer';

import * as Style from './styles';

function DefaultLayout(props) {
  const { exact, path, component: Component } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        console.log('🚀 ~ file: index.jsx ~ line 16 ~ DefaultLayout ~ routeProps', routeProps);
        return (
          <>
            <Header type="user" />
            <Style.MainContainer>
              <Component {...routeProps} />
            </Style.MainContainer>
            <Footer />
          </>
        )
      }}  
    />
  );
}

export default DefaultLayout;
