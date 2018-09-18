import React, {Component} from "react";
import {new_set} from "../helpers";
import ExerciseTable from "./ExerciseTable";
import '../css/SessionDetail.css';

export default class SessionDetails extends Component {
    state = {
        exercises: [],
        exercise: null,
        session: {},
        editingTitle: false,
        tableFriendlySets: []
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.currentTarget.name]: event.currentTarget.value
            }
        )
    };

    toggleIsEditingTitle = () => {
        this.setState({editingTitle: !this.state.editingTitle})
    }

    onTitleChange = (e) => {
        const sessionCopy = {
            ...this.state.session,
        }
        sessionCopy[e.currentTarget.name] = e.currentTarget.value;
        this.setState({session: sessionCopy})
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
        this.newSetFromExisting(this.state.exercise)
    };

    onSessionTitleEdit = (newTitle) => {
        fetch(`http://localhost:8000/api/session/${this.props.sessionId}/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            },
            body: JSON.stringify({
                name: newTitle,
            })
        })
            .then(r => r.json())
            .then((response) => {
                this.refreshSetsForSessionID()
                this.toggleIsEditingTitle()
            });
    }

    newSetFromExisting = (exerciseId) => {
        fetch(`http://localhost:8000/api/new-set-from-existing/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            },
            body: JSON.stringify({
                exercise_id: exerciseId,
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
        document.body.style.backgroundColor = 'white';
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
        fetch(`http://localhost:8000/api/session/${this.props.sessionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
            .then(r => r.json())
            .then(response => {
                this.setState({session: response});
            })
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
                console.log(response)
                this.setState({exercises: response});
            });
    }


    render() {
        let optionItems = this.state.exercises.map(exercise => {
            return <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
        })
        optionItems.unshift(<option key='blank' value='Select Exercise'>Select Exercise</option>)

        return (
            <div className="container session-detail-container">
                <div className="top-bar">
                    <a href="/">
                        <button className={'btn btn-info btn-sm'}>back</button>
                        <br/>
                    </a>
                </div>
                {
                    this.state.editingTitle ?
                        <div className="form-inline session-name-editing-form">
                            <input className="form-control session-name-input" type="text" name="name" onChange={this.onTitleChange}
                                   value={this.state.session.name}/>
                            <button className="btn btn-outline-info" onClick={() => this.onSessionTitleEdit(this.state.session.name)}>save</button>
                        </div> :

                        <h2 onClick={this.toggleIsEditingTitle}> {this.state.session.name}</h2>
                }
                {
                    this.state.tableFriendlySets.map((tableFriendlySet) => {
                        return <ExerciseTable key={tableFriendlySet.exercise_id}
                                              exerciseDetails={tableFriendlySet}
                                              refreshSetsForSessionID={this.refreshSetsForSessionID}
                                              newSetFromExisting={this.newSetFromExisting}/>
                    })
                }
                <hr/>
                <form>
                    <select className="custom-select" type="text" name="exercise" onChange={this.handleChange}>
                        {
                            optionItems
                        }
                    </select>
                    <button className="btn btn-block btn-info add-exercise-btn" onClick={this.onSubmit}>Add Exercise
                    </button>
                </form>
            </div>
        );
    }
}
