// Demonstrates a full featured react/redux app for managing 'employees'.
// Demonstrates routing, more redux and redux-thunk
// Demonstrates using a modal, texting a person and using firestore
import firebase from 'firebase';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
// this is considered middleware, so we must also include applyMiddleware from redux
//   and pass it into createStore
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyAP6vNr-kr7WS8pitiJD-jyCn-sugxRbfo',
      authDomain: 'emp-manager-31b4a.firebaseapp.com',
      databaseURL: 'https://emp-manager-31b4a.firebaseio.com',
      projectId: 'emp-manager-31b4a',
      storageBucket: 'emp-manager-31b4a.appspot.com',
      messagingSenderId: '481552999225'
    };

    firebase.initializeApp(config);
  }

  render() {
    //the second argument to createStore is any initial state that we want to apply to our store
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
