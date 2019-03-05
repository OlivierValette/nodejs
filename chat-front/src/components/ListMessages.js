import React, {Component} from 'react';
import Message from "./Message";

class ListMessages extends Component {
    render() {

        const messages = this.props.messages.map(message => <Message key={message._id} username={message.username} content={message.content}/>);

        return (
            <div>
                {messages}
            </div>
        );
    }
}

export default ListMessages;