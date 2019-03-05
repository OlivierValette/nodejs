import React, {Component} from 'react';

class Message extends Component {
    render() {
        return (
            <div className="chat-message">
                <blockquote>
                    <p>{this.props.content}</p>
                </blockquote>
                <cite>{this.props.username}</cite>
            </div>
        );
    }
}

export default Message;