import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';
import EmptyWorkout from './EmptyWorkout';
import Exercises from './Exercises';

function isLoggedIn() {
    return localStorage.getItem('api-token') != null;

}

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" render={(props) => {
                        if (isLoggedIn()) {
                            return <HomePage/>
                        } else {
                            return <Login/>
                        }
                    }}/>
                    <Route exact path="/" component={EmptyWorkout}/>
                    <Route render={(props) => {
                        if (isLoggedIn()) {
                            return <EmptyWorkout/>
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