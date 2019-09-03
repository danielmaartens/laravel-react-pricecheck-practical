import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="what">Example Component</div>
                            <div className="what">I'm an example component!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('what')) {
    ReactDOM.render(<Example />, document.getElementById('what'));
} else {
    <div>THERE IS NO ROOT DIV</div>
}
