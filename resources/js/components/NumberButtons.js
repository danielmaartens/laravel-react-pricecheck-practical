import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fillRange, generateRows} from "../util/util";


class NumberButtons extends Component {

    constructor(props) {
        super(props);

        this.generateColumns = this.generateColumns.bind(this);
        this.generateRows = this.generateRows.bind(this);
    }

    generateColumns(values) {
        const columns = [];

        const fixedColumnCount = this.props.fixedColumnCount;
        const maxNumberCount = this.props.maxNumberCount;
        const selectedNumbers = this.props.selectedNumbers;
        const buttonType = this.props.type;

        for (const v of values) {
            columns.push(
                <td key={`num-${buttonType}-col-${v}`}>
                    {
                        buttonType === 'button' ?
                            <button disabled={selectedNumbers.includes(v)}
                                    className={`num-cell num-cell-button ${selectedNumbers.includes(v) ? 'num-cell-button-inactive' : 'num-cell-button-active'}`}
                                    onClick={(e) => this.props.numberSelect(e, v)} key={`num-button-${v}`}
                            >
                                {v}
                            </button>
                            :
                            <button
                                disabled={!selectedNumbers.includes(v)}
                                className={`num-cell num-cell-display ${selectedNumbers.includes(v) ? 'num-cell-display-active' : 'num-cell-display-inactive'}`}
                                key={`num-display-${v}`}
                                onClick={(e) => this.props.numberSelect(e, v, true)} key={`num-button-${v}`}
                            >
                                {v}
                            </button>
                    }

                </td>
            );
        }

        return columns;
    };

    generateRows() {

        const fixedColumnCount = this.props.fixedColumnCount;
        const maxNumberCount = this.props.maxNumberCount;
        const selectedNumbers = this.props.selectedNumbers;
        const buttonType = this.props.type;

        const numbers = fillRange(1, maxNumberCount);
        const rows = [];
        let row = 0;

        while (numbers.length > 0) {
            console.log('Number array length = ', numbers.length);

            const buttonValues = numbers.splice(0, fixedColumnCount);

            rows.push(
                <tr className="num-row" key={`num-${buttonType}-row-${row}`}>
                    {this.generateColumns(buttonValues)}
                </tr>
            );

            row++;

        }

        return rows;
    };


    render() {




        return (
            <div>
                <table className="num-table">
                    <tbody>
                    {this.generateRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

NumberButtons.propTypes = {
    fixedColumnCount: PropTypes.number.isRequired,
    maxNumberCount: PropTypes.number.isRequired,
    selectedNumbers: PropTypes.array.isRequired,
    numberSelect: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

export default NumberButtons;

