import React, { useEffect } from "react";
import * as GetQuotes from "./particles/GetQuotes";
import CreateTaskModal from "./components/CreateTaskModal";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";
import DateData from "./components/DateData";
import { verifyDate } from "./components/DateData";
import { connect } from "react-redux";
import { getTasks } from "./reduxlayer/actions";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import "./css/vegaapp.css";

let App = props => {
  //dateURL-> get the date at the end of url(dd-mm-yyyy)
  let dateURL = props.location.pathname.slice(
    1,
    props.location.pathname.length
  );

  //get the all tasks as an initial event
  useEffect(() => {
    // verify the date if it written wrong #ex : 23-8-2019 change => 23-08-2019
    props.getTasks(verifyDate(dateURL));
  }, [props, dateURL]);
  return (
    <div>
      <div className="page-wrap">
        <CreateTaskModal date={verifyDate(dateURL)} />
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
  );
};

const mapDispatchToProps = dispatch => ({
  // redux dispatch function to get tasks for specific date
  getTasks: date => dispatch(getTasks(date))
});

// used "withRouter" to access the url in the browser and "connect" for connecting to the redux state
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
