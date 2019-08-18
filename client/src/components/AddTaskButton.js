import React from "react";
import { connect } from "react-redux";
import { togglePopup } from "../reduxlayer/actions";

const AddTaskButton = props => {
  return (
    <div>
      <span className="btn-icon">
        <img
          className="icon icon-plus js-modal-init"
          src={require("../icons/icon-plus.svg")}
          alt="Add New Item"
          onClick={() => props.togglePopup(true)}
        />
      </span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  togglePopup: value => dispatch(togglePopup(value))
});

export default connect(
  null,
  mapDispatchToProps
)(AddTaskButton);
