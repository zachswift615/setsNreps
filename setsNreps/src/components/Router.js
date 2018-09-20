import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';
import SessionDetails from './SessionDetails';
import Exercises from './Exercises';
import Register from './Register';

function isLoggedIn() {
    return localStorage.getItem('api-token') != null;

}

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/" render={(props) => {
                        if (isLoggedIn()) {
                            return <HomePage/>
                        } else {
                            return <Login/>
                        }
                    }}/>
                    <Route exact path="/session/:sessionId" render={(props) => {
                        if (isLoggedIn()) {
                            return <SessionDetails sessionId={props.match.params.sessionId}/>
                        } else {
                            return <Login/>
                        }
                    }}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
};