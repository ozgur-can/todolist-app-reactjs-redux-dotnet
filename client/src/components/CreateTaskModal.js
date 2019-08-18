import React, { useState } from "react";
import { connect } from "react-redux";
import { createTask, togglePopup } from "../reduxlayer/actions";
import Modal from "react-responsive-modal";

const CreateTaskModal = props => {
  const [inputData, updateInput] = useState("");

  return (
    <div>
      <Modal
        center={true}
        open={props.toggleData}
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
              disabled={!inputData} // TODO: inputData "" ise disabled olacak
              onClick={e => {
                e.preventDefault();
                props.togglePopup(false);
                props.createTask(inputData, props.date);
                updateInput("");
                //added create task dispatcher
              }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
const mapStateToProps = state => ({
  toggleData: state.toggleData
});
const mapDispatchToProps = dispatch => ({
  createTask: (task, date) => dispatch(createTask(task, date)),
  togglePopup: value => dispatch(togglePopup(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTaskModal);
