import React, {Component} from 'react';

export default class ExerciseTable extends Component {









    render() {
        return (
            <div>
                <h1>{this.props.exerciseDetails.exercise_name}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>
                                lbs
                            </th>
                            <th>
                                reps
                            </th>
                            <th>
                                complete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.exerciseDetails.sets.map((set) => {
                            return (
                                <tr key={set.id}>
                                    <td>
                                        {
                                            set.weight
                                        }
                                    </td>
                                    <td>
                                        {
                                            set.reps
                                        }
                                    </td>
                                    <td>
                                        {
                                            set.complete? "yes": "no"
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
};