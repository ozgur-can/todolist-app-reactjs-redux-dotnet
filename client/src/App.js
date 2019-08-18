import React, { useEffect } from "react";
import * as GetQuotes from "./particles/GetQuotes";
import "./css/vegaapp.css";
import CreateTaskModal from "./components/CreateTaskModal";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";
import DateData from "./components/DateData";
import { connect } from "react-redux";
import { getTasks } from "./reduxlayer/actions";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = props => {
  useEffect(() => {
    props.getTasks();
  }, [props]);
  return (
    <Router>
      <div>
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
                  <Route path="/" exact component={DateData} />
                  <Route path="/:datedata" exact component={DateData} />
                </div>
              </div>
            </div>
          </header>
          <TaskList />
          <footer className="footer">
            <div className="wrap">
              <span className="copy">&copy; 2018 Vega IT Sourcing</span>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
};

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
