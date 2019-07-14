import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";

class NewTodoModal extends Component {
  render() {
    return (
      <Modal
        size="lg"
        show="true"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      // <div className="modal-wrap js-modal">
      //   <div className="modal js-modal-inner">
      //     <h2>Create a task today:</h2>
      //     <form action="">
      //       <div className="field-wrap">
      //         <input
      //           className="field"
      //           type="text"
      //           placeholder="Title.."
      //           // value=""
      //           // TODO: value varsa onchange istiyor
      //         />
      //       </div>
      //       <div className="btn-wrap align-right">
      //         <input className="btn" type="submit" value="Create" />
      //       </div>
      //     </form>
      //   </div>
      // </div>
    );
  }
}

export default NewTodoModal;
