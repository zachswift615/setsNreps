import React from 'react';
import Router from './router';

export default class Login extends Component {
    //Set initial state
    state = {
        user: '',
        password: '',
        remember: false
    }

    // Update state whenever an input field is changed
    handleFieldChange = (e) => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }


    render() {
            return (
                <form onSubmit={this.handleLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <fieldset>
                        <label htmlFor="inputEmail">
                            Email address
                        </label>
                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword">
                            Password
                        </label>
                        <input onChange={this.handleFieldChange} type="password"
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

