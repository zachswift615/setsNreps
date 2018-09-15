import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'


export default class HomePage extends Component {
    state = {
        newWorkout: null
    }

onClick = (e) => {
    fetch("http://localhost:8000/api/session/new-workout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
      },
      body: JSON.stringify({ name: "Abs and stuff" })
    })
      .then(r => r.json())
      .then(response => {
        this.setState({ newWorkout: response });
      });
    console.log('clicked')
}

    render() {
        if(this.state.newWorkout) {
            return <Redirect to={`session/${this.state.newWorkout.id}`}/>
        }

        return (
            <div>
                <h1>Start Workout</h1>
                <h3>Quick Start</h3>
                <button onClick={this.onClick}>Create New Workout</button>
            </div>
        )
    }
};

