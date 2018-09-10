import React, { Component } from 'react';
// import Login from "./Login";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to setsNreps</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/notFound.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
