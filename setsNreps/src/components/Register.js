import React, { Component } from "react";
import "../css/Register.css";
import {Redirect} from 'react-router-dom';
import {APIURL} from '../helpers.js'

const swal = require("sweetalert");
export default class Register extends React.Component {
  state = {
    user: "",
    password: ""
  };

  emailRef = React.createRef();
  usernameRef = React.createRef();
  passwordRef = React.createRef();
  passwordConfirmRef = React.createRef();

  componentDidMount() {
    document.body.style.backgroundColor = "white";
  }

  register = event => {
    event.preventDefault();
    if (this.passwordRef.current.value !== this.passwordConfirmRef.current.value) {
        swal("", "Passwords do not match, please try again.", "error");
        return
    }
    const body = {
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value,
      email: this.emailRef.current.value
    };
    fetch(`${APIURL}users/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(response => {
        if (response.token) {
          localStorage.setItem("api-token", JSON.stringify(response.token));
          this.setState({ home: true });
          swal("", "You're ready to workout.", "success");
        } else {
            let messages = [];
            if (response.email) {
                messages.push('Email is already taken');
            }
            if (response.username) {
                messages.push('Username is already taken');
            }
            let finalMessage = messages.join(', ')
            swal("Try again.", finalMessage, "error");
        }
      });
  };

  render() {
      if (this.state.home) {
          return <Redirect to='/'></Redirect>
      }
    return (
      <div className="registration-form container">
        <form onSubmit={this.register}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              ref={this.emailRef}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="exampleUsername"
              ref={this.usernameRef}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              ref={this.passwordRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
              ref={this.passwordConfirmRef}
            />
          </div>
          <button type="submit" className="btn submit-btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
