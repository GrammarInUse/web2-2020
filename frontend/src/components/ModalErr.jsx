import React, { Component } from "react";

export default class ModalErr extends Component {
  render() {
    return (
      <div className="modal-profile">
        <div className="profile" style={{ height: 100, marginTop: 0 }}>
          <h3>ERROR</h3>
          <div>
            <p>{this.props.content}</p>
          </div>
        </div>
      </div>
    );
  }
}
