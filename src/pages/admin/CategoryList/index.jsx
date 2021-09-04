import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Button,
  Table,
  Space,
  Popconfirm,
} from "antd";

import ModifyCategoryModal from './components/ModifyCategoryModal';

import {
  getCategoryListAction,
  createCategoryAction,
  editCategoryAction,
  deleteCategoryAction,
} from '../../../redux/actions';

function CategoryListPage(props) {
  // "", "create", "edit"
  const [isShowModifyModal, setIsShowModifyModal] = useState('');
  const [modifyCategoryData, setModifyCategoryData] = useState({});

  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  function handleSubmitForm(values) {
    if (isShowModifyModal === 'create') {
      dispatch(createCategoryAction({
        data: values
      }));
    } else {
      dispatch(editCategoryAction({
        id: modifyCategoryData.id,
        data: values,
      }));
    }
    setIsShowModifyModal('');
  }

  const tableColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
              onClick={() => {
                setIsShowModifyModal('edit');
                setModifyCategoryData(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => dispatch(deleteCategoryAction({ id: record.id }))}
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

  const tableData = categoryList.data.map((categoryItem, categoryIndex) => {
    return {
      key: categoryIndex,
      ...categoryItem,
    }
  })

  return (
    <div>
      <div style={{ padding: 16 }}>
        <div>Category Manage</div>
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => {
              setIsShowModifyModal('create');
              setModifyCategoryData({ name: '', price: 0 });
            }}
          >
            Add Category
          </Button>
        </Row>
        <Table
          columns={tableColumn}
          dataSource={tableData}
          loading={categoryList.load}
        />
      </div>
      <ModifyCategoryModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyCategoryData={modifyCategoryData}
      />
    </div>
  );
}

export default CategoryListPage;
