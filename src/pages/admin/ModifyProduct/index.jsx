import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Space,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import history from "../../../utils/history";
import { convertFileToBase64 } from "../../../utils/common";

import {
  getCategoryListAction,
  getProductDetailAction,
  createProductAction,
  editProductAction,
} from "../../../redux/actions";

function ModifyProductPage({ match }) {
  const [uploadImages, setUploadImage] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const productId = match.params.id;

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productDetail } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  const [modifyProductForm] = Form.useForm();

  const initialValues = productId ? productDetail.data : {};

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetailAction({ id: productId }));
    }
  }, [productId]);

  useEffect(() => {
    if (productDetail.data.id) {
      modifyProductForm.resetFields();
      setUploadImage([...productDetail.data.images]);
    }
  }, [productDetail.data]);

  async function handleUploadImage(value) {
    if (!["image/png", "image/jpeg"].includes(value.file.type)) {
      return setUploadError('File không đúng!');
    }
    if (value.file.size > 1024000) {
      return setUploadError('File quá nặng!');
    }
    setUploadError('');
    const imageBase64 = await convertFileToBase64(value.file);
    await setUploadImage([...uploadImages, imageBase64]);
  }

  function handleSubmitForm(values) {
    if (productId) {
      dispatch(editProductAction({
        id: productId,
        data: {
          ...values,
          images: uploadImages,
        },
      }));
    } else {
      dispatch(createProductAction({
        data: {
          ...values,
          images: uploadImages,
        },
      }));
    }
  }

  function renderCategoryOptions() {
    return categoryList.data.map((categoryItem, categoryIndex) => (
      <Select.Option
        value={categoryItem.id}
        key={`category-${categoryItem.id}`}
      >
        {categoryItem.name}
      </Select.Option>
    ));
  }

  function renderProductImages() {
    return uploadImages.map((imageItem, imageIndex) => (
      <Col span={6}>
        <Image width="100%" src={imageItem} />
      </Col>
    ));
  }

  return (
    <div style={{ padding: 16 }}>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <h3>{productId ? "Edit product" : "Create product"}</h3>
        <Space>
          <Button onClick={() => history.push("/admin/products")}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => modifyProductForm.submit()}>
            Save
          </Button>
        </Space>
      </Row>
      <div style={{ padding: 16, background: "#f6f6f6" }}>
        <Form
          form={modifyProductForm}
          name="modify-product"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={initialValues}
          onFinish={(values) => handleSubmitForm(values)}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Row>
            <Col span={4} style={{ textAlign: "right" }}>
              <Space style={{ marginTop: 4 }} size={0}>
                <div
                  style={{
                    display: 'inline-block',
                    marginRight: '4px',
                    color: '#ff4d4f',
                    fontSize: '14px',
                    fontFamily: 'SimSun, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  *
                </div>
                <div style={{ marginRight: 8 }}>Image :</div>
              </Space>
            </Col>
            <Col span={20}>
              <Upload
                accept="image/*"
                listType="picture"
                beforeUpload={() => false}
                onChange={(value) => handleUploadImage(value)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
              {uploadImages.length > 0 && (
                <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                  {renderProductImages()}
                </Row>
              )}
              <div style={{ height: 24, color: '#ff4d4f' }}>
                {uploadError}
              </div>
            </Col>
          </Row>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please input your category!" }]}
          >
            <Select>{renderCategoryOptions()}</Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ModifyProductPage;
