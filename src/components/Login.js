/* global chrome */
import React from "react";
import "../styles/Login.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { confirmLogin } from "../scripts/Backend-Login";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      customerID: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({
        [name]: checked,
      })
      : this.setState({
        [name]: value,
      });
  }

  async handleLogin() {
    const { firstName, lastName, customerID } = this.state;

    let confirm = await confirmLogin(firstName, lastName, customerID);
    if (confirm) {
      this.props.handleLogin(firstName, lastName, customerID);
      chrome.storage.sync.set({ "customerID": customerID });
      chrome.storage.sync.set({ "firstName": firstName });
      chrome.storage.sync.set({ "lastName": lastName });
    } else {
      this.setState({
        firstName: "",
        lastName: "",
        customerID: "",
      });
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Col>
            <h1>ChaperONE</h1>
            <h3>Sign In</h3>
            <form>
              <div className="form-group">
                <label>First Name: </label>
                <input
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="First Name"
                />
              </div>

              <div className="form-group">
                <label>Last Name: </label>
                <input
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                />
              </div>

              <div className="form-group">
                <label>CustomerID: </label>
                <input
                  name="customerID"
                  value={this.state.customerID}
                  onChange={this.handleChange}
                  placeholder="Customer ID"
                />
              </div>
            </form>
            <Button onClick={() => this.handleLogin()}>Login</Button>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Login;
