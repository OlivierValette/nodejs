import React, { Component } from 'react';
import './App.css';
import FormMessage from "./components/FormMessage";
import ListMessages from "./components/ListMessages";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        fetch('http://localhost:4000/messages')
            .then(response => response.json())
            .then(data => this.setState({ messages: data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <FormMessage/>
              <ListMessages messages={this.state.messages}/>
            </header>
          </div>
        );
    }
}

export default App;
