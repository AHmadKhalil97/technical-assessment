import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTodos } from '../redux/reducers/rootReducer'

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
  ModalHeader
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Todos = props => {

  const { todos, updateTodos } = props
  const initialTodo = {
    title: '',
    completed: false,
    date: ''
  }

  const [todo, setTodo] = useState(initialTodo)
  const [updateIndex, setUpdateIndex] = useState(null)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const modifyTodos = () => {
    if (todo.title && todo.date) {
      updateIndex === null ?
        todos.filter(obj => obj.title === todo.title && obj.date === todo.date).length ?
          console.log('Already exists!!') :
          todos.push(todo) :
        todos[updateIndex] = { ...todo }

      updateTodos([...todos])
      setUpdateIndex(null)
      setTodo(initialTodo)
    }
    else console.log('EMPTY!!');
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
          <Button className='w-100' color='success' onClick={modifyTodos}>
            {updateIndex === null ? 'Add' : 'Update'} Todo
          </Button>
        </Col>
      </Row>
      <br />
      {todos.length ?
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
                    className={item.completed ? 'text-success' : 'text-primary'}
                    icon={item.completed ? faCheck : faSpinner} />
                </Col>
                <Col xs='4' className='text-start'>{item.title}</Col>
                <Col xs='3'>{new Date(item.date).toISOString().split('T')[0]}</Col>
                <Col xs='2'>
                  <FontAwesomeIcon
                    onClick={() => {
                      setUpdateIndex(index)
                      setTodo(item)
                    }}
                    className='text-primary cursor-pointer'
                    icon={faEdit} />
                </Col>
                <Col xs='2'>
                  <FontAwesomeIcon
                    onClick={() => {
                      toggle()
                      setDeleteIndex(index)
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
          <Button
            color="danger"
            onClick={() => {
              toggle()
              todos.splice(deleteIndex, 1);
              updateTodos([...todos])
              setDeleteIndex(null)
            }}>
            Yes, delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({ todos: state.todos });
const mapDispatchToProps = { updateTodos };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
