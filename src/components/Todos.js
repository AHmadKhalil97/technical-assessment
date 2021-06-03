import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateLists } from '../redux/reducers/rootReducer'

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

  const { lists, updateLists, selectedListId } = props
  const initialTodo = {
    title: '',
    completed: false,
    date: ''
  }

  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (selectedListId) {
      setTodos(lists.filter(list => list._id === selectedListId)[0].todos)
    }
  }, [selectedListId, lists])

  const [todo, setTodo] = useState(initialTodo)
  const [updateId, setUpdateId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const modifyTodos = () => {
    if (todo.title && todo.date) {
      updateId === null ?
        fetch(process.env.REACT_APP_API_URL + '/todo/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...todo, list_id: selectedListId })
        }).then(res => res.json())
          .then(lists => updateLists(lists))
        :

        fetch(process.env.REACT_APP_API_URL + '/todo/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id: updateId,
            ...todo
          })
        }).then(res => res.json())
          .then(lists => updateLists(lists))
          .finally(() => setUpdateId(null))

      setTodo(initialTodo)
    }
    else console.log('EMPTY!!');
  }

  const handleCompleted = item =>
    fetch(process.env.REACT_APP_API_URL + '/todo/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...item,
        completed: true
      })
    }).then(res => res.json())
      .then(lists => updateLists(lists))
      .finally(() => setUpdateId(null))

  const handleDelete = () => {
    toggle()
    fetch(process.env.REACT_APP_API_URL + '/todo/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: deleteId,
      })
    }).then(res => res.json())
      .then(lists => updateLists(lists))
      .finally(() => setDeleteId(null))
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
            {updateId === null ? 'Add' : 'Update'} Todo
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

const mapStateToProps = state => ({ lists: state.lists, selectedListId: state.selectedListId });
const mapDispatchToProps = { updateLists };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
