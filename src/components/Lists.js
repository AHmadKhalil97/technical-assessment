import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateLists } from '../redux/reducers/rootReducer'

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Lists = props => {

  const { lists, updateLists } = props

  const [name, setName] = useState('')
  const [updateIndex, setUpdateIndex] = useState(null)

  const modifyLists = () => {
    if (name) {
      updateIndex === null ?
        lists.includes(name) ?
          console.log('Already exists!!') :
          lists.push(name) :
        lists[updateIndex] = name

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
      {lists.length ? <ListGroup>
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
          <ListGroupItem key={`list_${index}`}>
            <Row>
              <Col xs='8' className='text-start'>{item}</Col>
              <Col xs='2'>
                <FontAwesomeIcon
                  onClick={() => {
                    setUpdateIndex(index)
                    setName(item)
                  }}
                  className='text-primary cursor-pointer'
                  icon={faEdit} />
              </Col>
              <Col xs='2'>
                <FontAwesomeIcon
                  onClick={() => {
                    lists.splice(index, 1);
                    updateLists([...lists])
                  }}
                  className='text-danger cursor-pointer'
                  icon={faTrashAlt} />
              </Col>
            </Row>
          </ListGroupItem>
        )}
      </ListGroup> : ''}
    </>
  )
}

const mapStateToProps = state => ({ lists: state.lists });
const mapDispatchToProps = { updateLists: updateLists };

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
