import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'


export default class SessionCard extends Component {
    state = {
        session: {},
        sessions: [],
        newWorkout: null,
        tableFriendlySets: []
    }

    componentDidMount() {
        fetch(`http://localhost:8000/api/set/table-friendly-set-list/?session_id=${this.props.session.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            }
        })
            .then(r => r.json())
            .then(response => {
                this.setState({tableFriendlySets: response});
            });
    }

    render() {
        return (
            <div className={"card"} style={{width: "18rem"}}>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>{this.props.session.name}</h5>
                    <h6 className={"card-subtitle mb-2 text-muted"}>{this.props.session.date_created}</h6>
                    {
                        this.state.tableFriendlySets.map(tableFriendlySet => {
                            return <p key={tableFriendlySet.exercise_id} className={"card-text"}>
                                {`${tableFriendlySet.sets.length} x ${tableFriendlySet.exercise_name}`}
                            </p>
                        })
                    }
                    <a href={`/session/${this.props.session.id}`} className={"card-link"}><button className="btn btn-sm btn-light">Edit</button></a>
                </div>
            </div>
        )
    }
};
