import React, {Component} from 'react';

class FormMessage extends Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Username"/>
                <textarea name="message"></textarea>
                <input type="submit"/>
            </form>
        );
    }
}

export default FormMessage;