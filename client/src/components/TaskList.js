import React from "react";
import { connect } from "react-redux";
import { finishTask } from "../reduxlayer/actions";
import toArray from "lodash.toarray";

const Task = props =>
  props.tasklist ? (
    toArray(props.tasklist).map((task, i) => {
      return (
        <main key={i} className="main">
          <div className="wrap">
            <div className="item-row">
              <label className="check-flag">
                <span className="check-flag-label">{task.name}</span>
                <span className="checkbox">
                  <input
                    className="checkbox-native"
                    type="checkbox"
                    onClick={() => {
                      props.finishTask(task.name, task.id, task.date);
                    }}
                  />
                  <span className="checkmark">
                    <svg viewBox="0 0 24 24">
                      <path
                        className="checkmark-icon"
                        fill="none"
                        stroke="white"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                      />
                    </svg>
                  </span>
                </span>
              </label>
            </div>
          </div>
        </main>
      );
    })
  ) : (
    <div>Loading or no element is listed</div>
  );

let TaskList = props => <div>{Task(props)}</div>;

const mapStateToProps = state => ({
  tasklist: state.tasks
});

const mapDispatchToProps = dispatch => ({
  finishTask: (task, id, date) => dispatch(finishTask(task, id, date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
