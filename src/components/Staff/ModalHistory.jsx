import React, { Component } from "react";

export default class ModalHistory extends Component {
  closeModal = () => {
    this.props.closeModal();
  };
  render() {
    let transaction = this.props.transaction;

    let date = transaction.dOT.substr(0, 10);
    let time = transaction.dOT.substr(11, 8);
    console.log(this.props.transaction);
    return (
      <div>
        <div className="modal-profile">
          <div className="profile" style={{ height: 400 }}>
            <h3>ModalHistory Transaction</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Date:</td>
                  <td>{date}</td>
                </tr>
                <tr>
                  <td>Time:</td>
                  <td>{time}</td>
                </tr>
                <tr>
                  <td>Satus:</td>
                  <td>{transaction.TransactionStatus.name}</td>
                </tr>
                <tr>
                  <td>Deposit:</td>
                  <td>{transaction.deposit}</td>
                </tr>
                <tr>
                  <td>Sender:</td>
                  <td>{transaction.sender}</td>
                </tr>
                <tr>
                  <td>Receicer:</td>
                  <td>{transaction.receiver}</td>
                </tr>
              </tbody>
            </table>
            <a id="close" onClick={this.closeModal}>
              x
            </a>
          </div>
        </div>
      </div>
    );
  }
}
