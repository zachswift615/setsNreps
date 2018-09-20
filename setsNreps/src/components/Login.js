import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import HomePage from "./HomePage";
import "../css/Login.css";

const swal = require("sweetalert");

export default class Login extends Component {
  //Set initial state
  state = {
    user: "",
    password: "",
    remember: false,
    goHome: false
  };

  userNameRef = React.createRef();
  passwordRef = React.createRef();

  componentDidMount() {
    document.body.style.backgroundColor = "#cccccc";
  }

  // Update state whenever an input field is changed
  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };

  handleLogin = e => {
    e.preventDefault();
    console.log(this.userNameRef.current.value);
    console.log(this.passwordRef.current.value);
    fetch("http://localhost:8000/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.userNameRef.current.value,
        password: this.passwordRef.current.value
      })
    })
      .then(r => r.json())
      .then(response => {
        if (response.token) {
          swal("", "Let's workout!", "success");
          localStorage.setItem("api-token", JSON.stringify(response.token));
          this.setState({ goHome: true });
        } else {
          swal("Oops", "Username or password was incorrect.", "error");
        }
      });
  };

  render() {
    if (this.state.goHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row loadingPageLogin align-items-center">
        <div className="login-page-text-col">
          <h1 className="">
            SETS <span>&</span> REPS
          </h1>
          <h4 className="">sore today. strong tomorrow.</h4>
        </div>
        <div className="sign-in-form-col">
          <form onSubmit={this.handleLogin} className="login">
            <div className="form-group">
              <label htmlFor="username" className="sr-only">
                user name
              </label>
              <input
                className="form-control"
                ref={this.userNameRef}
                onChange={this.handleFieldChange}
                type="text"
                id="username"
                placeholder="user name"
                required=""
                autoFocus=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword" className="sr-only">
                password
              </label>
              <input
                className="form-control"
                ref={this.passwordRef}
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                placeholder="password"
                required=""
              />
            </div>
            <button className="btn-lg btn btn-block form-signin" type="submit">
              Sign in
            </button>
          </form>
          <a href="/register">
            <button className="btn-lg btn btn-block form-signin">
              Sign Up
            </button>
          </a>
        </div>
        <p className="mt-5 mb-3 text-muted copyRight">© SETS & REPS 2018</p>
      </div>
    );
  }
}
