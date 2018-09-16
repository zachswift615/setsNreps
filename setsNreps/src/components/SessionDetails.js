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
        fetch(`http://localhost:8000/api/new-set-from-existing/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            },
            body: JSON.stringify({
                exercise_id: this.state.exercise,
                session_id: this.props.sessionId
            })
        })
            .then(r => r.json())
            .then((response) => {
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
                    <a href="/">
                        <button className={'btn btn-light btn-sm'}>back</button>
                    </a>
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
                    <select type="text" name="exercise" onChange={this.handleChange}>
                        {
                            optionItems
                        }
                    </select>
                    <button onClick={this.onSubmit}>Add Exercise</button>
                </form>
            </div>
        );
    }
}
