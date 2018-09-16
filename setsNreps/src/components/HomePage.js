import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import SessionCard from "./SessionCard";


export default class HomePage extends Component {
    state = {
        session: {},
        sessions: [],
        newWorkout: null
    }

    onClick = (e) => {
        fetch("http://localhost:8000/api/session/new-workout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            },
            body: JSON.stringify({name: "Abs and stuff"})
        })
            .then(r => r.json())
            .then(response => {
                this.setState({newWorkout: response});
            });
        console.log('clicked')
    }

    componentDidMount() {

        // get the list of all sessions and save them to state
        fetch("http://localhost:8000/api/sessions/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
            .then(r => r.json())
            .then(response => {
                console.log(response)
                this.setState({sessions: response});
            });
    }

    render() {
        if (this.state.newWorkout) {
            return <Redirect to={`session/${this.state.newWorkout.id}`}/>
        }

        return (
            <div>
                <h1>Start Workout</h1>
                <h3>Quick Start</h3>
                <button onClick={this.onClick}>Create New Workout</button>
                {
                    this.state.sessions.map(session => {
                        return <SessionCard key={session.id} session={session}/>
                    })
                }
            </div>
        )
    }
};

