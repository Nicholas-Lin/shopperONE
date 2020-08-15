/* global chrome */
import React from "react";
import Login from "./Login";
import Budget from "./Budget";
import SetBudget from "./SetBudget";

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      stage: "Login",
      budgetCap: 0,
      customerInfo: {},
      balance: 0,
    };
    chrome.storage.sync.get(
      ["firstName", "lastName", "customerID", "budgetCap", "balance"],
      function (data) {
        const { firstName, lastName, customerID, budgetCap, balance } = data;
        console.log(firstName && lastName && customerID && budgetCap && balance);
        if (firstName && lastName && customerID && budgetCap && balance) {
          this.setState({
            stage: "Budget",
            budgetCap: budgetCap,
            customerInfo: {
              firstName: firstName,
              lastName: lastName,
              customerID: customerID,
            },
            balance: balance,
          });
          console.log(this.state.stage);
        } else {
          this.setState({
            stage: "Login",
            budgetCap: 0,
            customerInfo: {},
            balance: 0,
          });
        }
      }.bind(this)
    );
  }

  componentDidMount() {
    setTimeout(() => { }, 200);
  }
  //   this.test().then(function (data) {
  //     const { firstName, lastName, customerID, budgetCap, balance } = data;
  //     console.log(firstName, lastName, customerID, budgetCap, balance);
  //     console.log(firstName && lastName && customerID && budgetCap && balance);
  //     if (firstName && lastName && customerID && budgetCap && balance) {
  //       this.state = {
  //         stage: "Budget",
  //         budgetCap: budgetCap,
  //         customerInfo: {
  //           firstName: firstName,
  //           lastName: lastName,
  //           customerID: customerID,
  //         },
  //         balance: balance,
  //       };
  //       this.forceUpdate();
  //       //   console.log(this.state.stage);
  //     } else {
  //       this.state = {
  //         stage: "Login",
  //         budgetCap: 0,
  //         customerInfo: {},
  //         balance: 0,
  //       };
  //     }
  //   }.bind(this));
  //   console.log(this.state.stage);
  //   // this.init();
  // }

  // test() {
  //   return new Promise(function (resolve, reject) {
  //     chrome.storage.sync.get(["firstName", "lastName", "customerID", "budgetCap", "balance"], function (data) {
  //       resolve(data);
  //     })
  //   });
  // }

  // let temp = {};
  // await chrome.storage.sync.get(
  //   ["firstName", "lastName", "customerID", "budgetCap", "balance"],
  //   function (data) {
  //     const { firstName, lastName, customerID, budCap, bal } = data;
  //     console.log(firstName && lastName && customerID && budCap && bal);
  //     if (firstName && lastName && customerID && budCap && bal) {
  //       temp = {
  //         stage: "Budget",
  //         budgetCap: budCap,
  //         customerInfo: {
  //           firstName: firstName,
  //           lastName: lastName,
  //           customerID: customerID,
  //         },
  //         balance: bal,
  //       };
  //       console.log(this.state.stage);
  //     } else {
  //       temp = {
  //         stage: "Login",
  //         budgetCap: 0,
  //         customerInfo: {},
  //         balance: 0,
  //       };
  //     }
  //   }
  // );
  // this.setState(temp);

  handleLogin(firstName, lastName, customerID) {
    this.setState({
      stage: "SetBudget",
      customerInfo: {
        first: firstName,
        last: lastName,
        customerId: customerID,
      },
    });
  }

  saveBudget(value) {
    this.setState({ stage: "Budget", budgetCap: value, balance: value });
    chrome.storage.sync.set({ "budgetCap": value }, function () {
      console.log("Budget cap is: " + value);
    });
    chrome.storage.sync.set({ "balance": value }, function () {
      console.log("Balance is: " + value);
    });
  }

  editBudget() {
    this.setState({ stage: "SetBudget" });
  }

  render() {
    return (
      <div>
        {(() => {
          switch (this.state.stage) {
            case "Login":
              return <Login handleLogin={this.handleLogin.bind(this)} />;
            case "SetBudget":
              return <SetBudget saveBudget={this.saveBudget.bind(this)} budgetCap={this.state.budgetCap} />;
            case "Budget":
              return (
                <Budget
                  editBudget={this.editBudget.bind(this)}
                  budgetCap={this.state.budgetCap}
                  balance={this.state.balance}
                />
              );
            default:
              return <p> Something failed! Please restart extension. </p>;
          }
        })()}
      </div>
    );
  }
}

export default Popup;
