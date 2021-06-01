import './App.scss';
import { connect } from 'react-redux';
import { updateLists, updateTodos } from './redux/reducers/rootReducer'

import Lists from './components/Lists'

import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const App = props => {
  console.log(props);

  const todos = [{
    title: 'Cras justo odio',
    completed: false,
    date: new Date()
  }, {
    title: 'Dapibus ac facilisis in',
    completed: true,
    date: new Date()
  }, {
    title: 'Morbi leo risus',
    completed: false,
    date: new Date()
  }, {
    title: 'Porta ac consectetur ac',
    completed: true,
    date: new Date()
  }, {
    title: 'Vestibulum at eros',
    completed: false,
    date: new Date()
  }]

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col md='5'>
            <Lists />
          </Col>
          <Col md='7'>
            <Row>
              <Col md='6' lg='4' xl='5'>
                <Input placeholder='Enter title' />
              </Col>
              <Col md='6' lg='4' xl='5'>
                <Input type="date" />
              </Col>
              <Col md='12' lg='4' xl='2'>
                <Button className='w-100' color='success'>Add Todo</Button>
              </Col>
            </Row>
            <br />
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
                    <Col xs='3'>{item.date.toISOString().split('T')[0]}</Col>
                    <Col xs='2'>
                      <FontAwesomeIcon className='text-primary' icon={faEdit} />
                    </Col>
                    <Col xs='2'>
                      <FontAwesomeIcon className='text-danger' icon={faTrashAlt} />
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  lists: state.lists,
  todos: state.todos,
});

const mapDispatchToProps = {
  updateLists: updateLists,
  updateTodos: updateTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
