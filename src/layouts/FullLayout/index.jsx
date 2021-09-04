import { Route } from "react-router-dom";

function FullLayout(props) {
  const { exact, path, component: Component } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return <Component {...routeProps} />;
      }}  
    />
  );
}

export default FullLayout;
