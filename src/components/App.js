import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          <List />
          <Workspace />
        </div>
      </div>
    )
  }
}

export default App;
