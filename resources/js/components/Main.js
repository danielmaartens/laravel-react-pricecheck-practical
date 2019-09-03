import React, { Component } from 'react';
// import axios from 'axios';

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            numbersToProcess: [2,4,6,13,15],
            maxNumberCount: 20,
        };

        // this.process = this.process.bind(this);
    }

    // async process(e) {
    //     e.preventDefault();
    //
    //     const {
    //         numbersToProcess,
    //         maxNumberCount,
    //     } = this.state;
    //
    //     await axios.post('/process', {
    //         numbersToProcess,
    //         maxNumberCount,
    //     });
    // }

    render() {
        return (
            <div className="container">
                <button>What are my missing numbers ?</button>
            </div>
        );
    }
}

export default Main;

