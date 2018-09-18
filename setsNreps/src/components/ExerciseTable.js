import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "../css/ExerciseTable.css";

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
      dataField: "df1",
      text: "completed",
      isDummyField: true,
      editable: false,
      formatter: (cellContent, row) => (
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              onChange={event => this.onToggleComplete(event, row.id)}
              checked={row.complete}
            />
          </label>
        </div>
      )
    },
    {
      dataField: "df2",
      isDummyField: true,
      editable: false,
      text: "",
      formatter: (cellContent, row) => {
        return (
          <button
            onClick={() => this.deleteSet(row.id)}
            className="btn btn-sm btn-outline delete-button"
          >
            delete
          </button>
        );
      }
    }
  ];

  componentDidMount() {
    document.body.style.backgroundColor = 'white';
}

  deleteSet = set_id => {
    fetch(`http://localhost:8000/api/sets/${set_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
      }
    }).then(this.props.refreshSetsForSessionID);
  };

  onToggleComplete = (event, set_id) => {
    let body = { complete: event.currentTarget.checked };
    this.updateSet(set_id, body)
  };

  updateSet = (set_id, body) => {
    fetch(`http://localhost:8000/api/sets/${set_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(response => {
        this.props.refreshSetsForSessionID();
      });
  };

  onCellEdit = (oldValue, newValue, row, column) => {
    if (column.dataField == "weight" || column.dataField == "reps") {
      newValue = parseInt(newValue);
    }
        this.updateSet(row.id, {[column.dataField]: newValue});
  };

  render() {
    return (
      <div className="body">
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
            <button
              className="btn btn-block btn-sm btn-outline-info"
              onClick={() =>
                this.props.newSetFromExisting(
                  this.props.exerciseDetails.exercise_id
                )
              }
            >
              Add Set
            </button>
          </div>
        </div>
      </div>
    );
  }
}
