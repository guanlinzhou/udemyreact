import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, FormText } from "react-bootstrap";
import "./App.css"
// import FormContainer from "./containers/FormContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      email:"",
      phone:"",
      url:"",
      validationtext:""
    }
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
    this.validate()
  }

  validate() {
    var flag = false;
    let userData = this.state;
    let name = userData.name;
    if (name.length < 3 || name.length > 30 && (!/^[a-zA-Z ]+$/).test(name)) {
      flag = true;
    }

    let email = userData.email;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      flag = true;
    }

    let phone = userData.phone;
    if (!(/^\(?([2-9]{1})\)?([0-9]{9})$/).test(phone)) {
      flag = true;
    }

    let url = userData.url;
    let emailRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    if (!emailRegex.test(url)) {
      flag = true;
    }

    if (flag === true) {
      this.setState({validationtext: "Form is incomplete!"})
    }
    else {
      this.setState({validationtext: "Form is complete!"})
    }
  }

  render() {
    return (
      <div className="contact-form">
            <h1 className="header"> Contact Form </h1>
            <br />
            <div className="main-form">
              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="name">
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.name}
                    placeholder="Enter your Full Name"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="email">
                  <FormLabel>Email </FormLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.email}
                    placeholder="Enter your email address"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormText className="text-muted">
                  We'll never share your email with anyone else.
                </FormText>
                <FormGroup controlId="phone">
                  <FormLabel>Phone </FormLabel>
                  <FormControl
                    autoFocus
                    type="number"
                    value={this.state.phone}
                    placeholder="Enter your phone number (digits only)"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="url">
                  <FormLabel>Blog URL </FormLabel>
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
                  size="lg"
                  type="submit"
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
