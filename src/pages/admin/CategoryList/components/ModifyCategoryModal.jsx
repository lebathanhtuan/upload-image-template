import { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
} from "antd";

function ModifyCategoryModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyCategoryData,
}) {
  const [modifyCategoryForm] = Form.useForm();

  useEffect(() => {
    if (isShowModifyModal) {
      modifyCategoryForm.resetFields();
    }
  }, [isShowModifyModal]);

  return (
    <Modal
      title={isShowModifyModal === "create" ? "Create Category" : "Edit Category"}
      visible={!!isShowModifyModal}
      onOk={() => modifyCategoryForm.submit()}
      onCancel={() => setIsShowModifyModal('')}
    >
      <Form
        form={modifyCategoryForm}
        name="modify-category"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={modifyCategoryData}
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyCategoryModal;
