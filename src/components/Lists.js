import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateLists, setSelectedList } from '../redux/reducers/rootReducer'

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

  const { lists, updateLists, selectedList, setSelectedList } = props

  const [name, setName] = useState('')
  const [updateIndex, setUpdateIndex] = useState(null)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const modifyLists = () => {
    if (name) {
      updateIndex === null ?
        lists.includes(name) ?
          console.log('Already exists!!') :
          lists.push(name) :
        lists[updateIndex] = name


      fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body: JSON.stringify({ name })
      })
        .then(res => res.json())
        .then(data => console.log(data))

      updateLists([...lists])
      setUpdateIndex(null)
      setName('')
    }
    else console.log('EMPTY!!');
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
            color='success'
            className='btn_prepend'
            onClick={modifyLists}>
            {updateIndex === null ? 'Add' : 'Update'}
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
          {lists.map((item, index) =>
            <ListGroupItem
              className={selectedList === index ? 'bg-primary text-white' : ''}
              key={`list_${index}`}
              onClick={() => {
                setSelectedList(index)
              }}
            >
              <Row>
                <Col xs='8' className='text-start'>{item}</Col>
                <Col xs='2'>
                  <FontAwesomeIcon
                    onClick={() => {
                      setUpdateIndex(index)
                      setName(item)
                    }}
                    className={`cursor-pointer text-${selectedList === index ? 'white' : 'primary'}`}
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
          Are you sure of deleting this list ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>No, cancel</Button>{' '}
          <Button color="danger"
            onClick={() => {
              toggle()
              lists.splice(deleteIndex, 1);
              updateLists([...lists])
              setDeleteIndex(null)
            }}>
            Yes, delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({ lists: state.lists, selectedList: state.selectedList });
const mapDispatchToProps = { updateLists, setSelectedList };

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
