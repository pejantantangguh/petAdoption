import React from "react";
import { createPortal } from "react-dom";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement("div");
  }

  componentDidMount() {
    this.modalRoot = document.getElementById("modal");
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
