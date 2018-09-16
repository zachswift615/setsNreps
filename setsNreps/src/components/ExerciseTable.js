import React, {Component} from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import '../css/ExerciseTable.css'

export default class ExerciseTable extends Component {
    columns = [
        {
            dataField: "weight",
            text: "lbs"
        },
        {
            dataField: "reps",
            text: "reps"
        },
        {
            dataField: "complete",
            text: "completed",
            formatter: (cellContent, row) => (
                <div className="checkbox disabled">
                    <label>
                        <input type="checkbox" checked={ row.complete }/>
                    </label>
                </div>
            )
        }];

    onCellEdit = (oldValue, newValue, row, column) => {
        if (column.dataField == 'weight' || column.dataField == 'reps') {
            newValue = parseInt(newValue)
        }
        if (column.dataField == 'complete') {
            if (newValue === 'false') {
                newValue = false;
            } else {
                newValue = true;
            }
        }
        fetch(`http://localhost:8000/api/sets/${row.id}/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
            },
            body: JSON.stringify({[column.dataField]: newValue})
        })
            .then(r => r.json())
            .then(response => {
                this.setState({exercises: response});
            });
    };


    render() {
        return (
            <div className="exercise-table-container">
                <div className="react-bootstrap-table">
                    <h4>{this.props.exerciseDetails.exercise_name}</h4>
                    <BootstrapTable
                        keyField="id"
                        classes="table table-borderless table-sm"
                        data={this.props.exerciseDetails.sets}
                        columns={this.columns}
                        cellEdit={cellEditFactory({
                            mode: "click",
                            blurToSave: true,
                            afterSaveCell: this.onCellEdit
                        })}
                        bordered={false}
                    />
                    <button className="btn btn-block btn-outline-info" onClick={() => this.props.newSetFromExisting(this.props.exerciseDetails.exercise_id)}>Add Set</button>
                </div>
            </div>
        );
    }
}
