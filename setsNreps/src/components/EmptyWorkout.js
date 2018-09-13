import React, { Component } from "react";
import { new_set } from "../helpers";
import ExerciseTable from "./ExerciseTable";

export default class EmptyWorkout extends Component {
    state = {
        exercises: [],
        exercise: null,
        session: {},
        sets: []
    }
    handleChange = (event) => {
        console.log(event)
            this.setState(
                {
                    [event.currentTarget.name]: event.currentTarget.value
                }
            )
    }

    refreshSetsForSessionID = () => {
        fetch(`http://localhost:8000/api/set/table-friendly-set-list/?session_id=${this.state.session.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
        .then(r => r.json())
        .then(response => {
            this.setState({sets: []});
            this.setState({sets: response});
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        new_set(
            this.state.exercise,
            0,
            this.state.weight,
            this.state.reps,
            this.state.session.id,
            1     
        ).then((response) => {
                // call whatever function you have to re-get all the sets for a workout
                this.refreshSetsForSessionID()
                // also, you'll have to adjust the /api/sets/ endpoint to filter by workout_id
            });

    }

  componentDidMount() {
    // create a new workout and set it to state
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
        this.setState({ session: response });
      });
    // get the list of all exercises and save them to state
    fetch("http://localhost:8000/api/exercises/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
      }
    })
      .then(r => r.json())
      .then(response => {
        this.setState({ exercises: response });
      });
  }

  render() {
    let optionItems = this.state.exercises.map(exercise => {
        return <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
    })
    optionItems.unshift(<option key='blank' value='Select Exercise'>Select Exercise</option>)

    return (
      <div>
        <h1>New Workout</h1>
        {
           this.state.sets.map((set) => {
               return <ExerciseTable key={set.exercise_id} exerciseDetails={set}></ExerciseTable>
           })
        }
        <form>
            <label>Notes<textarea name="notes" onChange={this.handleChange}></textarea></label><br></br>
            <select type="text" name="exercise" onChange={this.handleChange}>
            {
                optionItems
            }
            </select><br></br>
            <label>Weight<input type="number" name="weight" onChange={this.handleChange}></input></label><br></br>
            <label>Reps<input type="number" name="reps" onChange={this.handleChange}></input></label><br></br>
          <button onClick={this.onSubmit} >Add Exercise</button>
        </form>
      </div>
    );
  }
}
