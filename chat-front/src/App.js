import React, { Component } from 'react';
import './App.css';
import FormMessage from "./components/FormMessage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <FormMessage/>
        </header>
      </div>
    );
  }
}

export default App;
