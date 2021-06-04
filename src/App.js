import './App.scss';
import Lists from './components/Lists'
import Todos from './components/Todos';
import { Row, Col, Container } from 'reactstrap'

const App = props =>
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

export default App;
