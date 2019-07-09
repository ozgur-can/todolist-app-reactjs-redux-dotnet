import React from "react";
import logo from "./logo.svg";
//import './App.css';

function App() {
  return (
    <div>
      <div class="page-wrap">
        <header class="header">
          <div class="wrap">
            <span class="btn-icon">
              <img
                class="icon icon-plus js-modal-init"
                src="icons/icon-plus.svg"
                alt="Add New Item"
              />
            </span>
            <div class="header-blockquote">
              <h1 class="header-quote" />
              <div class="header-cite" />
            </div>
          </div>
          <div class="header-inner">
            <div class="wrap">
              <img class="logo" src="images/vegait-logo.svg" alt="VegaIT" />
              <div class="date-wrap">
                <img
                  class="icon"
                  src="icons/icon-calendar.svg"
                  alt="Calendar"
                />
                <time>02 / 08 / 2018</time>
              </div>
            </div>
          </div>
        </header>

        <main class="main">
          <div class="wrap">
            <div class="item-row">
              <label class="check-flag">
                <span class="check-flag-label">Pick up drycleaning</span>
                <span class="checkbox">
                  <input class="checkbox-native" type="checkbox" />
                  <span class="checkmark">
                    <svg viewBox="0 0 24 24">
                      <path
                        class="checkmark-icon"
                        fill="none"
                        stroke="white"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                      />
                    </svg>
                  </span>
                </span>
              </label>
            </div>

            <div class="item-row">
              <label class="check-flag">
                <span class="check-flag-label">Study for exam</span>
                <span class="checkbox">
                  <input class="checkbox-native" type="checkbox" />
                  <span class="checkmark">
                    <svg viewBox="0 0 24 24">
                      <path
                        class="checkmark-icon"
                        fill="none"
                        stroke="white"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                      />
                    </svg>
                  </span>
                </span>
              </label>
            </div>

            <div class="item-row">
              <label class="check-flag">
                <span class="check-flag-label">Drink beer</span>
                <span class="checkbox">
                  <input class="checkbox-native" type="checkbox" />
                  <span class="checkmark">
                    <svg viewBox="0 0 24 24">
                      <path
                        class="checkmark-icon"
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

        <div class="modal-wrap js-modal">
          <div class="modal js-modal-inner">
            <h2>Create a task today:</h2>
            <form action="">
              <div class="field-wrap">
                <input
                  class="field"
                  type="text"
                  placeholder="Title.."
                  value=""
                />
              </div>
              <div class="btn-wrap align-right">
                <input class="btn" type="submit" value="Create" />
              </div>
            </form>
          </div>
        </div>

        <footer class="footer">
          <div class="wrap">
            <span class="copy">&copy; 2018 Vega IT Sourcing</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
