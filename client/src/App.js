import React, { useState, useEffect } from "react";
import * as GetQuotes from "./Particles/GetQuotes";
import "./css/vegaapp.css";
import CreateTaskModal from "./components/CreateTaskModal";
import Task from "./components/Task";
import { connect } from "react-redux";
import { getTasks } from "./reduxlayer/actions";

const App = props => {
  const [taskPopup, showTaskPopup] = useState(false);
  // const [inputData, updateInput] = useState("");
  useEffect(() => {
    props.getTasks();
  }, [props]);

  return (
    <div>
      <div className="page-wrap">
        {taskPopup && <CreateTaskModal />}
        <header className="header">
          <div className="wrap">
            <span className="btn-icon">
              <img
                className="icon icon-plus js-modal-init"
                src={require("./icons/icon-plus.svg")}
                alt="Add New Item"
                onClick={() => {
                  if (taskPopup === false) showTaskPopup(true);
                  else showTaskPopup(false);
                }}
              />
            </span>
            <div className="header-blockquote">
              <h1 className="header-quote">{GetQuotes.obj.quote}</h1>
              <div className="header-cite" />— {GetQuotes.obj.owner}
            </div>
          </div>
          <div className="header-inner">
            <div className="wrap">
              <img
                className="logo"
                src={require("./images/vegait-logo.svg")}
                alt="VegaIT"
              />
              <div className="date-wrap">
                <img
                  className="icon"
                  src={require("./icons/icon-calendar.svg")}
                  alt="Calendar"
                />
                <time>02 / 08 / 2018</time>
              </div>
            </div>
          </div>
        </header>
        <Task />
        <footer className="footer">
          <div className="wrap">
            <span className="copy">&copy; 2018 Vega IT Sourcing</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
