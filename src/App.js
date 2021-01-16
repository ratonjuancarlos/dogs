import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home'
import MyTeam from './MyTeam'
import Detail from './Detail'

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"  data-test="home">Home</Link>
          </li>
          <li>
            <Link to="/my-team" data-test="my-team">My Team</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/detail/:dog">
          <Detail />
        </Route>
        <Route path="/my-team">
          <MyTeam />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
