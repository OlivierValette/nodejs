import React, {Component} from 'react';

class FormMessage extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', content: '' };
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:4000/messages', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(this.state),
        })
            .then(response => response.json())
            .then(data => {
                // emit 'new message' event to server
                this.props.socket.emit('new message', data);
                // empty content of message input
                this.setState({content: ''});
            })
    }

    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <div className="form-group">
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={event => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <textarea name="content" cols="20" rows="5" value={this.state.content} onChange={event => this.handleChange(event)}></textarea>
                </div>
                <input type="submit" />
            </form>
        );
    }
}

export default FormMessage;