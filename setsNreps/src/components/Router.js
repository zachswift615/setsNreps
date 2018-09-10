import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
    }
};
