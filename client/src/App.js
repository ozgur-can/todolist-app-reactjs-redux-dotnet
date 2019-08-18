import React, { useEffect } from "react";
import * as GetQuotes from "./particles/GetQuotes";
import "./css/vegaapp.css";
import CreateTaskModal from "./components/CreateTaskModal";
import Task from "./components/Task";
import AddTaskButton from "./components/AddTaskButton";
import { connect } from "react-redux";
import { getTasks } from "./reduxlayer/actions";

const App = props => {
  useEffect(() => {
    props.getTasks();
  }, [props]);
  return (
    <div>
      {console.log("props")}
      <div className="page-wrap">
        <CreateTaskModal />
        <header className="header">
          <div className="wrap">
            <AddTaskButton />
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

const mapStateToProps = state => ({
  toggleData: state.toggleData
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
