import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path="/" component={HomePage}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
};
