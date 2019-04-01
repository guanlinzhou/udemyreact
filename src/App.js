import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, FormText } from "react-bootstrap";
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      email:"",
      phone:"",
      url:"",
      validationtext:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
};

  handleSubmit = e => {
    e.preventDefault();
    this.validate();
  }

  validate() {
    var flag = false;
    let userData = this.state;

    /*
      test name validity criteria:
        1. letters Only
        2. 3 <= name length <= 30
    */
    let name = userData.name;
    if (name.length < 3 || name.length > 30 && (!/^[a-zA-Z ]+$/).test(name)) {
      flag = true;
    }

    //  test email validity: check email formatting present
    let email = userData.email;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      flag = true;
    }

    // test phone number validity: 10 digits, 1st digit not 0 or 1
    let phone = userData.phone;
    if (!(/^\(?([2-9]{1})\)?([0-9]{9})$/).test(phone)) {
      flag = true;
    }

    // uses url-regex package from npm to automate url regex validation
    let url = userData.url;
    let urlRegex = require('url-regex');
    if (!urlRegex({exact: true, strict: false}).test(url)) {
      flag = true;
    }

    //sets validation text for display at bottom of page
    if (flag === true) {
      this.setState({validationtext: "Form is Incomplete!"});
    }
    else {
      this.setState({validationtext: "Form is Complete!"});
    }
  }

  render() {
    // Styles button; I hate in-line styling too but react forced me to
    const buttonStyle = {padding: '0.5rem 4rem', fontSize: '1rem', lineHeight: '1.5', borderRadius: '0.3rem'};
    return (
      <div className="contact-form">
            <h1 className="header"> Contact Form </h1>
            <br />
            <div className="main-form">
              <form onSubmit={this.handleSubmit}>
              {/* renders form using react forms, grouping each label
                and input field as one formGroup */}
                <FormGroup controlId="name">
                  <FormLabel>Name:</FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.name}
                    placeholder="Enter your name"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="email">
                  <FormLabel>Email: </FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.email}
                    placeholder="Enter your email"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormText className="text-muted">
                  We'll never share your email with anyone else.
                </FormText>
                <FormGroup controlId="phone">
                  <FormLabel>Phone: </FormLabel>
                  <FormControl
                    autoFocus
                    type="number"
                    value={this.state.phone}
                    placeholder="Enter your phone number (digits only)"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="url">
                  <FormLabel>Blog URL: </FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.url}
                    placeholder="Enter your blog URL"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <div className="button-container">
                <Button
                  variant="success"
                  className="register-button"
                  type="submit"
                  style={buttonStyle}
                >
                  Verify
                </Button>
                </div>
              </form>
              {this.state.validationtext && (<h4 className="error-message"> {this.state.validationtext} </h4>)}
            </div>
          </div>
    );
  }
}


export default App;
