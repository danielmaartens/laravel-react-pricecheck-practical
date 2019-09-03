import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from "./Main";

export default class App extends Component {
    render() {
        return (
            <div>Hello</div>
        );
    }
}

if (document.getElementById('approot')) {
    ReactDOM.render(<App />, document.getElementById('approot'));
}
