import React, { Component } from 'react';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import { configureStore } from '../../store';
import { stayLoggedIn } from '../../store/actions/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from '../Landing';
import './style.css';

const store = configureStore();

class App extends Component {
  componentDidMount() {
    // basic check for the token in localStorage
    store.dispatch(stayLoggedIn());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Landing />
          </div>
        </Router>
      </Provider>
=======
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/index.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
>>>>>>> c37410d8a0b83e54bdc524b4f5b6c7439d07d281
    );
  }
}

export default App;
