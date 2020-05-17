import React, { Component } from 'react';
import './App.css';
import 'loaders.css';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import Container from './Container';
import Search from './Search';
import BreedList from './BreedList';
import Collection from "./Collection";
const store = createStore(reducer, applyMiddleware(thunk,logger));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
         <h1 className="text-center my-4"> Dog API Search </h1>
          <Search/>
          <BreedList/>
          <Collection/>
        </Container>
      </Provider>
    );
  }
}

export default App;
