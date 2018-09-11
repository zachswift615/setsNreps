import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import HomePage from './HomePage';

export default class Login extends Component {
    //Set initial state
    state = {
        user: '',
        password: '',
        remember: false,
        goHome: false
    }

    userNameRef = React.createRef();
    passwordRef = React.createRef();

    // Update state whenever an input field is changed
    handleFieldChange = (e) => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        console.log(this.userNameRef.current.value)
        console.log(this.passwordRef.current.value)
        fetch("http://localhost:8000/api-token-auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: this.userNameRef.current.value, password: this.passwordRef.current.value})
        }).then(r => r.json())
            .then((response) => {
                if (response.token) {
                    console.log(response.token)
                    localStorage.setItem('api-token', JSON.stringify(response.token));
                    this.setState({goHome: true})
                } else {
                    console.log(response)
                }
            })
    }


    render() {
            if (this.state.goHome) {
                return <Redirect to="/"/>
            }
            return (
                <form onSubmit={this.handleLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <fieldset>
                        <label htmlFor="inputEmail">
                            User Name
                        </label>
                        <input ref={this.userNameRef} onChange={this.handleFieldChange} type="text"
                            id="email"
                            placeholder="User Name"
                            required="" autoFocus="" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword">
                            Password
                        </label>
                        <input ref={this.passwordRef} onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="remember">
                            Remember Me
                        </label>
                        <input onChange={this.handleChecked}
                               defaultChecked={this.state.remember}
                               type="checkbox" name="remember" id="remember"/>
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            )
        }
    }

