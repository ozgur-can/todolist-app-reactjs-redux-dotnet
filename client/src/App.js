import React, { useState } from "react";
import * as GetQuotes from "./Particles/GetQuotes";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import styles from "./css/vegaapp.css";
import NewTodoModal from "./NewTodoModal";
// <NewTodoModal />
import Modal from "react-responsive-modal";

const App = () => {
  const [showData, updateShow] = useState(false);
  const [inputData, updateInput] = useState("");

  return (
    <div>
      <Modal center="true" open={showData} onClose={() => updateShow(false)}>
        <h2> Create a task today: </h2>
        <form action="">
          <div className="field-wrap">
            <input
              className="field"
              type="text"
              placeholder="Title.."
              value={inputData}
              onChange={e => updateInput(e.target.value)}
            />
          </div>
          <div className="btn-wrap align-right">
            <input
              className="btn"
              type="submit"
              value="Create"
              disabled={!inputData} // TODO: inputData "" ise disabled olacak
              onClick={e => {
                e.preventDefault();
                updateShow(false);
                updateInput("");
              }}
            />
          </div>
        </form>
      </Modal>
      <div className="page-wrap">
        <header className="header">
          <div className="wrap">
            <span className="btn-icon">
              <img
                className="icon icon-plus js-modal-init"
                src={require("./icons/icon-plus.svg")}
                alt="Add New Item"
                onClick={() => updateShow(true)}
              />
            </span>
            <div className="header-blockquote">
              <h1 className="header-quote" />
              {GetQuotes.obj.quote}
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
        <main className="main">
          <div className="wrap">
            <div className="item-row">
              <label className="check-flag">
                <span className="check-flag-label">Pick up drycleaning</span>
                <span className="checkbox">
                  <input className="checkbox-native" type="checkbox" />
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

            <div className="item-row">
              <label className="check-flag">
                <span className="check-flag-label">Study for exam</span>
                <span className="checkbox">
                  <input className="checkbox-native" type="checkbox" />
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

            <div className="item-row">
              <label className="check-flag">
                <span className="check-flag-label">Drink beer</span>
                <span className="checkbox">
                  <input className="checkbox-native" type="checkbox" />
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
        <footer className="footer">
          <div className="wrap">
            <span className="copy">&copy; 2018 Vega IT Sourcing</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
