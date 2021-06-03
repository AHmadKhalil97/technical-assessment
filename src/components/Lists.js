import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateLists, setSelectedListId } from '../redux/reducers/rootReducer'

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Lists = props => {

  const { lists, updateLists, selectedListId, setSelectedListId } = props

  const [name, setName] = useState('')
  const [updateId, setUpdateId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/list/get')
      .then(res => res.json())
      .then(lists => updateLists(lists))
  }, [])

  const toggle = () => setModal(!modal);

  const modifyLists = () => {
    if (name) {
      updateId === null ?
        lists.includes(name) ?
          console.log('Already exists!!')
          :
          fetch(process.env.REACT_APP_API_URL + '/list/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
          }).then(res => res.json())
            .then(lists => updateLists(lists))
        :
        fetch(process.env.REACT_APP_API_URL + '/list/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id: updateId,
            name
          })
        }).then(res => res.json())
          .then(lists => updateLists(lists))
          .finally(() => setUpdateId(null))

      updateLists([...lists])
      setName('')
    }
    else console.log('EMPTY!!');
  }

  const handleDelete = () => {
    toggle()
    fetch(process.env.REACT_APP_API_URL + '/list/delete', {
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
      <InputGroup>
        <Input
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          placeholder='Enter name of the list' />
        <InputGroupAddon addonType='prepend'>
          <Button
            disabled={!name}
            color='success'
            className='btn_prepend'
            onClick={modifyLists}>
            {updateId === null ? 'Add' : 'Update'}
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <br />
      {lists.length ?
        <ListGroup>
          <ListGroupItem >
            <Row className='fw-bold'>
              <Col xs='8' className='text-start'>Name</Col>
              <Col xs='2'>
                Edit
            </Col>
              <Col xs='2'>
                Delete
            </Col>
            </Row>
          </ListGroupItem>
          {lists.map((list, index) =>
            <ListGroupItem
              className={selectedListId === list._id ? 'bg-primary text-white' : ''}
              key={`list_${index}`}
              onClick={() => {
                setSelectedListId(list._id)
              }}
            >
              <Row>
                <Col xs='8' className='text-start'>{list.name}</Col>
                <Col xs='2'>
                  <FontAwesomeIcon
                    onClick={e => {
                      e.stopPropagation()
                      setUpdateId(list._id)
                      setName(list.name)
                    }}
                    className={`cursor-pointer text-${selectedListId === list._id ? 'white' : 'primary'}`}
                    icon={faEdit} />
                </Col>
                <Col xs='2'>
                  <FontAwesomeIcon
                    onClick={e => {
                      e.stopPropagation()
                      toggle()
                      setDeleteId(list._id)
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
          Are you sure of deleting this list ?
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
const mapDispatchToProps = { updateLists, setSelectedListId };

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
