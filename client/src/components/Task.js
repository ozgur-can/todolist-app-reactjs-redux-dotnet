import React from "react";
import { connect } from "react-redux";
import { finishTask } from "../reduxlayer/actions";
import toArray from "lodash.toarray";
import shortid from "shortid";

const Task = props => {
  var obj = props.article;

  return (
    <div>
      {toArray(obj).map((data, i) => {
        return (
          <main key={i} className="main">
            <div className="wrap">
              <div className="item-row">
                <label className="check-flag">
                  <span className="check-flag-label">{data.title}</span>
                  <span className="checkbox">
                    <input
                      className="checkbox-native"
                      type="checkbox"
                      onClick={() => props.finishTask("taskName")}
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
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  article: state.news
});

const mapDispatchToProps = dispatch => ({
  finishTask: task => dispatch(finishTask(task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
