import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Input, Button, Card, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

import Item from './components/Item';

import {
  createTaskAction,
  editTaskAction,
  deleteTaskAction,
} from '../../../redux/actions';

function ToDoListPage() {
  const [searchKey, setSearchKey] = useState('');

  const { taskList } = useSelector((state) => state.todoReducer);

  const dispatch = useDispatch();

  const filterTaskList = taskList.filter((task) => {
    return task.title.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
  })
  
  const [addTaskForm] = Form.useForm();

  function handleAddTask(values) {
    dispatch(createTaskAction({
      data: {
        createAt: moment().valueOf(),
        updateAt: null,
        ...values,
      }
    }))
    addTaskForm.resetFields();
  }

  function handleEditTask(values, id) {
    dispatch(editTaskAction({
      id: id,
      data: {
        updateAt: moment().valueOf(),
        ...values,
      },
    }));
  }

  function handleDeleteTask(id) {
    dispatch(deleteTaskAction({ id: id }));
  }

  function renderTaskList() {
    return filterTaskList.map((taskItem, taskIndex) => {
      return (
        <Item
          key={`${taskIndex}-${taskItem.title}`}
          id={taskItem.id}
          title={taskItem.title}
          description={taskItem.description}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      )
    })
  }

  return (
    <div style={{ width: 500, margin: '24px auto' }}>
      <Row justify="space-between">
        <h2>TO DO LIST</h2>
      </Row>
      <Card title="Add task" size="small">
        <Form
          form={addTaskForm}
          name="create-task"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ title: '', description: '' }}
          onFinish={(values) => handleAddTask(values)}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form>
      </Card>
      <Input
        onChange={(e) => setSearchKey(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ margin: '16px 0' }}
      />
      {renderTaskList()}
    </div>
  );
}

export default ToDoListPage;
