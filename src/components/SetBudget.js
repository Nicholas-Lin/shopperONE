import React from "react";
import "../styles/SetBudget.css";
import Button from "react-bootstrap/Button";

class SetBudget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.budgetCap };
    this.handleChange = this.handleChange.bind(this);
  }

  saveBudget() {
    this.props.saveBudget(this.state.value);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          name="value"
          type="number"
          min="0"
          value={this.state.value}
          onChange={this.handleChange}
        ></input>
        <Button onClick={() => this.saveBudget()}>Save Budget</Button>
      </div>
    );
  }
}

export default SetBudget;
