import React, {Component} from 'react';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>Start Workout</h1>
                <h3>Quick Start</h3>
                <a href={'/emptyworkout'}>
                    <button>Create New Workout</button>
                </a>
            </div>
        )
    }
};

