import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Button,
  Table,
  Space,
  Popconfirm,
} from "antd";
import moment from 'moment';
import history from '../../../utils/history';

import {
  getCategoryListAction,
  getProductListAction,
  deleteProductAction,
} from '../../../redux/actions';

function ProductListPage(props) {

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productList } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction());
  }, []);

  const tableColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (value) => {
        const categoryData = categoryList.data.find((item) => item.id === value);
        if (categoryData) return categoryData.name;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => value && moment(value).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() => history.push(`/admin/product/${record.id}/edit`)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => dispatch(deleteProductAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const tableData = productList.data.map((productItem, productIndex) => {
    return {
      key: productIndex,
      ...productItem,
    }
  })

  return (
    <div style={{ padding: 16 }}>
      <div>Product Manage</div>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => history.push('/admin/product/create')}
        >
          Add Product
        </Button>
      </Row>
      <Table
        columns={tableColumn}
        dataSource={tableData}
        loading={productList.load}
      />
    </div>
  );
}

export default ProductListPage;
