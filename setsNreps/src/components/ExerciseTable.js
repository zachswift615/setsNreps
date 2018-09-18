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
    // {
    //   dataField: "complete",
    //   text: "completed",
    //   formatter: (cellContent, row) => (
    //     <div className="checkbox disabled">
    //       <label>
    //         <input type="checkbox" checked={row.complete} />
    //       </label>
    //     </div>
    //   )
    // },
    {
      dataField: "completed",
      isDummyField: true,
      editable: false,
      text: "completed",
      formatter: (cellContent, row) => {
        if (row.complete) {
          return (
            <label>
              <input className="label label-success" type="checkbox"/>
            </label>
          );
        }
      }
    },
    {
      dataField: "delete",
      isDummyField: true,
      editable: false,
      text: "",
      formatter: (cellContent, row) => {
        return (
          <button className="btn btn-sm btn-warning">delete</button>
        );
      }
    }
  ];

  onCellEdit = (oldValue, newValue, row, column) => {
    if (column.dataField == "weight" || column.dataField == "reps") {
      newValue = parseInt(newValue);
    }
    if (column.dataField == "complete") {
      if (newValue === "false") {
        newValue = false;
      } else {
        newValue = true;
      }
    }
    fetch(`http://localhost:8000/api/sets/${row.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + JSON.parse(localStorage.getItem("api-token"))
      },
      body: JSON.stringify({ [column.dataField]: newValue })
    })
      .then(r => r.json())
      .then(response => {
        this.setState({ exercises: response });
      });
  };

  handleDeleteButtonClick = onClick => {
    console.log("This is my custom function for DeleteButton click event");
    onClick();
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
