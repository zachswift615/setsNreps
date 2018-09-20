import React, {Component} from "react";
import "../css/Register.css";


export default class Register extends React.Component {
    state = {
        user: "",
        password: ""
      };

    emailRef = React.createRef();
    userNameRef = React.createRef();
    passwordRef = React.createRef();
    passwordConfirmRef = React.createRef();

    componentDidMount() {
        document.body.style.backgroundColor = "white";
      }

    render () {
        return (
            <div className="registration-form">
          <form onSubmit={this.register}>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control"
                     id="exampleInputEmail1"
                     ref={this.emailRef}
                     placeholder="Enter username"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input type="text" className="form-control"
                     id="exampleInputEmail1"
                     ref={this.usernameRef}
                     placeholder="Enter username"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control"
                     id="exampleInputPassword1" placeholder="Password"
                     ref={this.passwordRef}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input type="password" className="form-control"
                     id="exampleInputPassword1" placeholder="Password"
                     ref={this.passwordConfirmRef}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>

        )
    }
};