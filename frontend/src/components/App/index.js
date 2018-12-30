import React, { Component } from 'react';
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
    );
  }
}

export default App;
