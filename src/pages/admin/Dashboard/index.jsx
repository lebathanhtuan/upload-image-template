import { Button } from 'antd';
import { connect } from "react-redux";

import history from '../../../utils/history';

function AdminDashboardPage(props) {
  return (
    <div>
      <Button onClick={() => history.push('/')}>Go to Home</Button>
      <h4 className="image-title">&nbsp;&nbsp;Dashboard Page</h4>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPage);
