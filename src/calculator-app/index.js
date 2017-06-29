import React from 'react';
import ReactDOM from 'react-dom';
import { add } from '../calculator';

export default class CalculatorApp extends React.Component {
  constructor() {
    super();
    this.state = {
      inputOne: 0,
      inputTwo: 0,
      inputSum: 0
    };

    this.onInputOneChange = this.onInputOneChange.bind(this);
    this.onInputTwoChange = this.onInputTwoChange.bind(this);
    this.add = this.add.bind(this);
  }

  onInputOneChange(e) {
    if (e.target.value < 0 || e.target.value > 9) {
      return;
    }
    this.setState({
      inputOne: e.target.value
    });
  }

  onInputTwoChange(e) {
    if (e.target.value < 0 || e.target.value > 9) {
      return;
    }
    this.setState({
      inputTwo: e.target.value
    });
  }

  add() {
    const neuralNetworkSum = add(parseInt(this.state.inputOne), parseInt(this.state.inputTwo));
    this.setState({
      inputSum: neuralNetworkSum
    })
  }

  render() {
    const style = {
      margin: '1em',
      fontSize: '2em'
    };

    return (
      <div>
        <h1>Machine Assisted Development</h1>
        <h3>View the console to see the weights.</h3>
        <input
          style={style}
          type = 'number'
          value = {
            this.state.inputOne
          }
          onChange = {
            this.onInputOneChange
          }
        />
        <input
          style={style}
          type = 'number'
          value = {
            this.state.inputTwo
          }
          onChange = {
            this.onInputTwoChange
          }
        />
        <button style={style} type="button" onClick={this.add}>Add</button>
        <input
          style={style}
          type="text"
          value={this.state.inputSum}
          readOnly
        />
      </div>
    )
  }
}
