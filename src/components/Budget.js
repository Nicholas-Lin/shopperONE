import React from "react";
import "../styles/Budget.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "react-bootstrap/Button";

class Budget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const percent = 100 * (this.props.balance / this.props.budgetCap);
    return (
      <div className="wrapper">
        <h4>
          ${this.props.balance} of ${this.props.budgetCap} remaining
        </h4>
        <CircularProgressbar value={percent} text={Math.round(percent) + "%"} />
        <Button onClick={this.props.editBudget}>Change Budget</Button>
      </div>
    );
  }
}

export default Budget;
