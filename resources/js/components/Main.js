import React, {Component} from 'react';
import axios from 'axios';
import NumberButtons from './NumberButtons';
import {generateRandomSelection} from "../util/util";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numbersToProcess: [],
            // numbersToProcess: [2, 4, 6, 13, 15],
            maxNumberCount: 20,
            missingNumberString: '',
            requestSuccess: false,
        };

        this.process = this.process.bind(this);
        this.numberSelect = this.numberSelect.bind(this);
        this.randomise = this.randomise.bind(this);
    }

    async process(e) {
        e.preventDefault();

        console.log('Sending post request...');

        const {
            numbersToProcess,
            maxNumberCount,
        } = this.state;

        const result = await axios.post('/process', {
            numbersToProcess,
            maxNumberCount,
        });

        console.log('MISSING NUMBER STRING: ', result.data);

        this.setState({
            missingNumberString: result.data,
            requestSuccess: true,
        });
    }

    reset(e) {
        e.preventDefault();
        this.setState({
            numbersToProcess: [],
            requestSuccess: false,
        });
    }

    randomise(e) {
        e.preventDefault();
        this.setState({
            numbersToProcess: generateRandomSelection(this.state.maxNumberCount),
        });
    }

    numberSelect(e, number, remove) {

        if (remove) {
            this.setState({
                numbersToProcess: this.state.numbersToProcess.filter(n => n !== number)
            });
        } else {
            this.setState({
                numbersToProcess: [...this.state.numbersToProcess, number]
            });
        }

        console.log('NUMBER: ', number);
        console.log('NUMBERS TO PROCESS: ', this.state.numbersToProcess);
    }

    render() {
        return (
            <div>
                <div className="buttons">

                    <div className="randomise-button-div">
                        <button className="app-button reset-button" onClick={(e) => this.randomise(e)}>Randomise !</button>
                    </div>

                    <div className="reset-button-div">
                        <button className="app-button reset-button" onClick={(e) => this.reset(e)}>Reset</button>
                    </div>
                </div>
                {
                    this.state.requestSuccess ?
                        <div className="result result-success">
                            {this.state.missingNumberString}
                        </div>

                        :
                        <div className="result result-none">
                            Select a few numbers and click "Get my missing numbers !"
                        </div>
                }
                <div className="submit-button-div">
                    <button className="app-button submit-button" onClick={(e) => this.process(e)}>
                        Get my missing numbers !
                    </button>
                </div>

                <NumberButtons maxNumberCount={this.state.maxNumberCount}
                               selectedNumbers={this.state.numbersToProcess}
                               fixedColumnCount={10}
                               numberSelect={this.numberSelect}
                               type="display"
                />
                <NumberButtons numberSelect={this.numberSelect} maxNumberCount={this.state.maxNumberCount}
                               selectedNumbers={this.state.numbersToProcess}
                               fixedColumnCount={5}
                               type="button"
                />

            </div>
        );
    }
}

export default Main;

