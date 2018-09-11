import React, {Component} from 'react';

export default class EmptyWorkout extends Component {
    componentDidMount() {
        // create a new workout and set it to state
        fetch("http://localhost:8000/api/session/new-workout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "TOKEN " + JSON.parse(localStorage.getItem('api-token'))
            },
            // user: {"username": "jswift"},
            body: JSON.stringify({name: "Abs and stuff"})
        }).then(r => r.json())
        .then((response) => {
            this.setState({workout: response});
        });
        // get the list of all exercisess and save them to state
        fetch("http://localhost:8000/api/exercises/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "TOKEN " + JSON.parse(localStorage.getItem('api-token'))
            }
        }).then(r => r.json())
        .then((response) => {
            this.setState({exercises: response});
        });
    };

    render() {
        return (
            <div>
                <h1>New Workout</h1>
            </div>
        )
    }
};


// .then((response) => {
//     fetch("http://localhost:8000/api/sessions/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "TOKEN " + JSON.parse(localStorage.getItem('api-token'))
//         },
//         body: JSON.stringify({name: "Abs and stuff"})
//     }).then(r => r.json())
//     .then((response) => {
//         console.log(response)
//     })
// })
