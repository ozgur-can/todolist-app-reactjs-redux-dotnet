import React, { useState } from "react";
import { connect } from "react-redux";
import { createTask, togglePopup } from "../reduxlayer/actions";
import Modal from "react-responsive-modal";

const CreateTaskModal = props => {
  // I've used only here react hooks' usestate to keep taskname just because it's simple and easy
  const [inputData, updateInput] = useState("");

  return (
    <div>
      <Modal
        center={true}
        open={props.toggleTaskModal}
        onClose={() => props.togglePopup(false)}
      >
        <h2> Create a task today: </h2>
        <form>
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
              disabled={!inputData}
              onClick={e => {
                e.preventDefault();
                props.createTask(inputData, props.date);
                props.togglePopup(false);
                updateInput("");
                // added create task dispatcher and togglePopup dispatcher
              }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
const mapStateToProps = state => ({
  toggleTaskModal: state.toggleTaskModal
});
const mapDispatchToProps = dispatch => ({
  createTask: (task, date) => dispatch(createTask(task, date)),
  togglePopup: value => dispatch(togglePopup(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTaskModal);
