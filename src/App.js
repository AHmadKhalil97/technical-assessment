import './App.scss';
import { connect } from 'react-redux';
import { updateLists, updateTodos } from './redux/reducers/rootReducer'

import Lists from './components/Lists'
import Todos from './components/Todos';

import {
  Row,
  Col,
  Container
} from 'reactstrap'

const App = props => {
  console.log(props);

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col md='5'>
            <Lists />
          </Col>
          <Col md='7'>
            <Todos />
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
