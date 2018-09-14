import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import HomePage from './HomePage';
import '../css/Login.css'

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
                <div  className="loadingPageLogin">
                <form onSubmit={this.handleLogin} className="login">
                    <h1 className="h3 mb-3 font-weight-normal">setsNreps</h1>
                        <label htmlFor="inputEmail" className="sr-only">
                            user name
                        </label>
                        <input className='form-control' ref={this.userNameRef} onChange={this.handleFieldChange} type="text"
                            id="email"
                            placeholder="user name"
                            required="" autoFocus="" />
                        <label htmlFor="inputPassword" className="sr-only">
                            password
                        </label>
                        <input className='form-control' ref={this.passwordRef} onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="password"
                            required="" />
                        <button className="btn-lg btn btn-outline btn-block form-signin" type="submit">
                            Sign in
                        </button>
                    <p className="mt-5 mb-3 text-muted copyRight">© setsNreps 2018</p>
                </form>
                        </div>
            )
        }
    }

