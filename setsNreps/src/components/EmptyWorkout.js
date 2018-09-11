import React, {Component} from 'react';

export default class EmptyWorkout extends Component {
    componentDidMount() {
        fetch("http://localhost:8000/api/session/new-workout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "TOKEN " + JSON.parse(localStorage.getItem('api-token'))
            },
            body: JSON.stringify({name: "Abs and stuff"})
        }).then(r => r.json())
            .then((response) => {
                console.log(response)
            })
    };

    render() {
        return (
            <div>
                <h1>New Workout</h1>
            </div>
        )
    }
};
