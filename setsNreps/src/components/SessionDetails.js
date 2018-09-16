import React, {Component} from "react";
import {new_set} from "../helpers";
import ExerciseTable from "./ExerciseTable";

export default class SessionDetails extends Component {
    state = {
        exercises: [],
        exercise: null,
        session: {},
        tableFriendlySets: []
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
        fetch(`http://localhost:8000/api/set/table-friendly-set-list/?session_id=${this.props.sessionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
            .then(r => r.json())
            .then(response => {
                this.setState({tableFriendlySets: response});
            })
    };

    onSubmit = (e) => {
        e.preventDefault();
        new_set(
            this.state.exercise,
            0,
            this.state.weight,
            this.state.reps,
            this.props.sessionId,
            1
        ).then((response) => {
            // call whatever function you have to re-get all the tableFriendlySets for a workout
            this.refreshSetsForSessionID()
            // also, you'll have to adjust the /api/tableFriendlySets/ endpoint to filter by workout_id
        });

    }

    componentDidMount() {
        // get the list of all exercises and save them to state
        fetch(`http://localhost:8000/api/set/table-friendly-set-list/?session_id=${this.props.sessionId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
            .then(r => r.json())
            .then(response => {
                this.setState({tableFriendlySets: response});
            })
        fetch("http://localhost:8000/api/exercises/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
            .then(r => r.json())
            .then(response => {
                this.setState({exercises: response});
            });
    }

    render() {
        let optionItems = this.state.exercises.map(exercise => {
            return <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
        })
        optionItems.unshift(<option key='blank' value='Select Exercise'>Select Exercise</option>)

        return (
            <div>
                <div>
                    <a href="/"><button className={'btn btn-light btn-sm'}>back</button></a>
                </div>
                <h1>New Workout</h1>
                {
                    this.state.tableFriendlySets.map((tableFriendlySet) => {
                        return <ExerciseTable key={tableFriendlySet.exercise_id}
                                              exerciseDetails={tableFriendlySet}
                                              refreshSetsForSessionID={this.refreshSetsForSessionID}/>
                    })
                }
                <form>
                    <label>Notes<textarea name="notes" onChange={this.handleChange}/></label><br/>
                    <select type="text" name="exercise" onChange={this.handleChange}>
                        {
                            optionItems
                        }
                    </select><br/>
                    <label>Weight<input type="number" name="weight"
                                        onChange={this.handleChange}/></label><br/>
                    <label>Reps<input type="number" name="reps" onChange={this.handleChange}/></label><br/>
                    <button onClick={this.onSubmit}>Add Exercise</button>
                </form>
            </div>
        );
    }
}
