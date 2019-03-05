import React, { Component } from 'react';
import './App.css';
import FormMessage from "./components/FormMessage";
import ListMessages from "./components/ListMessages";
import io from 'socket.io-client';

const socket = io('http://localhost:4001');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount() {
        fetch('http://localhost:4000/messages')
            .then(response => response.json())
            .then(data => this.setState({ messages: data }))
            .catch(err => console.log(err));

        socket.on('new message', message => this.setState({ messages: [message, ...this.state.messages] }));
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <FormMessage socket={socket}/>
              <ListMessages messages={this.state.messages}/>
            </header>
          </div>
        );
    }
}

export default App;
