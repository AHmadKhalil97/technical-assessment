import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, deleteTodo } from '../redux/actions/index'

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Todos = props => {

  const {
    lists,
    addTodo,
    updateTodo,
    deleteTodo,
    selectedListId,
    loading
  } = props
  const initialTodo = {
    title: '',
    completed: false,
    date: ''
  }

  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (selectedListId)
      setTodos(lists.filter(list => list._id === selectedListId)[0].todos)
  }, [selectedListId, lists])

  const [todo, setTodo] = useState(initialTodo)
  const [updateId, setUpdateId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const modifyTodos = () => {
    if (todo.title && todo.date) {
      updateId === null ?
        addTodo({ ...todo, list_id: selectedListId }) :
        updateTodo({ _id: updateId, ...todo })

      setUpdateId(null)
      setTodo(initialTodo)
    }
    else console.log('EMPTY!!');
  }

  const handleCompleted = item => {
    updateTodo({ ...item, completed: true })
    setUpdateId(null)
  }

  const handleDelete = () => {
    toggle()
    deleteTodo({ _id: deleteId })
    setDeleteId(null)
  }

  return (
    <>
      <Row>
        <Col md='6' lg='4' xl='5'>
          <Input
            value={todo.title}
            onChange={({ target: { value } }) => setTodo({ ...todo, title: value })}
            placeholder='Enter title' />
        </Col>
        <Col md='6' lg='4' xl='5'>
          <Input
            value={todo.date}
            onChange={({ target: { value } }) => setTodo({ ...todo, date: value })}
            type="date" />
        </Col>
        <Col md='12' lg='4' xl='2'>
          <Button
            disabled={!(todo.title && todo.date && selectedListId)}
            className='w-100'
            color='success'
            onClick={modifyTodos}>
            {loading ? <Spinner size='sm' color="light" /> :
              updateId === null ? 'Add Todo' : 'Update Todo'}
          </Button>
        </Col>
      </Row>
      <br />
      {todos?.length ?
        <ListGroup>
          <ListGroupItem>
            <Row>
              <Col xs='1'>Status</Col>
              <Col xs='4' className='text-start'>Title</Col>
              <Col xs='3'>Date</Col>
              <Col xs='2'>Edit</Col>
              <Col xs='2'>Delete</Col>
            </Row>
          </ListGroupItem>
          {todos.map((item, index) =>
            <ListGroupItem key={`todo_${index}`}>
              <Row>
                <Col xs='1'>
                  <FontAwesomeIcon
                    onClick={e =>
                      item.completed ?
                        e.preventDefault() :
                        handleCompleted(item)
                    }
                    className={`cursor-pointer ${item.completed ? 'text-success' : 'text-primary'}`}
                    icon={item.completed ? faCheck : faSpinner} />
                </Col>
                <Col xs='4' className='text-start'>{item.title}</Col>
                <Col xs='3'>{new Date(item.date).toISOString().split('T')[0]}</Col>
                <Col xs='2'>
                  <FontAwesomeIcon
                    onClick={() => {
                      setUpdateId(item._id)
                      setTodo(item)
                    }}
                    className='text-primary cursor-pointer'
                    icon={faEdit} />
                </Col>
                <Col xs='2'>
                  <FontAwesomeIcon
                    onClick={() => {
                      toggle()
                      setDeleteId(item._id)
                    }}
                    className='text-danger cursor-pointer'
                    icon={faTrashAlt} />
                </Col>
              </Row>
            </ListGroupItem>
          )}
        </ListGroup> : ''}

      <Modal centered backdrop isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Alert!</ModalHeader>
        <ModalBody>
          Are you sure of deleting this todo ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>No, cancel</Button>{' '}
          <Button color="danger" onClick={handleDelete}>
            Yes, delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  lists: state.lists,
  selectedListId: state.selectedListId,
  loading: state.loading
});
const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
