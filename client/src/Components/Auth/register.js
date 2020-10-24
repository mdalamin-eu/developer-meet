import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TextFieldsGroup from "../common/TextFieldGroup.js";
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.password !== this.state.password2) {
      console.log("password do not match");
    } else {
      const { name, email, password } = this.state;
      const registerData = {
        name,
        email,
        password
      };
    }
  };

  onChange = e => {
      console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    const { name, email, password, password2 } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldsGroup
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={this.onChange}
                />

                <TextFieldsGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />

                <TextFieldsGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                />

                <TextFieldsGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;