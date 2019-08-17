import React, { useState } from "react";
import { connect } from "react-redux";
import { createTask } from "../reduxlayer/actions";
import Modal from "react-responsive-modal";

const CreateTaskModal = props => {
  const [showData, updateShow] = useState(true);
  const [inputData, updateInput] = useState("");

  return (
    <div>
      <Modal center={true} open={showData} onClose={() => updateShow(false)}>
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
                updateShow(false);
                updateInput("");
                props.createTask(inputData);
                //added create task dispatcher
              }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateTaskModal);
