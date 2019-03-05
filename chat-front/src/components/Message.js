import React, {Component} from 'react';

class Message extends Component {
    render() {
        return (
            <div>
                <blockquote>
                    <p>{this.props.content}</p>
                    <cite>{this.props.username}</cite>
                </blockquote>
            </div>
        );
    }
}

export default Message;