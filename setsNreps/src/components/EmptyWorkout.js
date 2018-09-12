import React, { Component } from "react";

export default class EmptyWorkout extends Component {
    state = {
        exercises: [],
        exercise: {},
        session: {}
    }
    handleChange = (event) => {
        this.setState({exercise: event.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/set/new-set/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "TOKEN " + JSON.parse(localStorage.getItem('api-token'))
            },
            body: JSON.stringify({
                exercise_id: 1,
                previous: 0,
                weight: 0,
                reps: 0,
                session_id: this.state.session.id,
                order: 1
            })
        })
            .then(r => r.json())
            .then((response) => {
                // call whatever function you have to re-get all the sets for a workout
                // this.refreshSetsForWorkoutID() //example name for a function like that.
                // also, you'll have to adjust the /api/sets/ endpoint to filter by workout_id
            }).catch((e) => {
                console.log(e);
            });

    }

  componentDidMount() {
    // create a new workout and set it to state
    fetch("http://localhost:8000/api/session/new-workout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "TOKEN " + JSON.parse(localStorage.getItem("api-token"))
      },
      // user: {"username": "jswift"},
      body: JSON.stringify({ name: "Abs and stuff" })
    })
      .then(r => r.json())
      .then(response => {
        this.setState({ session: response });
      });
    // get the list of all exercisess and save them to state
    fetch("http://localhost:8000/api/exercises/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "TOKEN " + JSON.parse(localStorage.getItem("api-token"))
      }
    })
      .then(r => r.json())
      .then(response => {
        this.setState({ exercises: response });
      });
  }

  render() {
    return (
      <div>
        <h1>New Workout</h1>
        <form>
            <select type="text" name="exercise" onChange={this.handleChange}>
            {
                this.state.exercises.map(exercise => {
                    return <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                })
            }
            </select>
          <button onClick={this.onSubmit} >Add New Set</button>
        </form>
      </div>
    );
  }
}
