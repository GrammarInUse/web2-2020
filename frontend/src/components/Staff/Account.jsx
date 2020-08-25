import React, { Component } from "react";

export default class Account extends Component {
  closeModal = () => {
    this.props.onCloseModal();
  };
  render() {
    let {
      balance,
      maturity,
      ServiceType,
      CurrencyUnit,
      id,
    } = this.props.Account;
    let date = maturity || "none";

    if (maturity) {
      let ind = maturity.indexOf("T");

      if (date !== -1) {
        date = date.slice(0, ind);
      }
    }
    return (
      <div style={{ marginTop: 100 }}>
        <div className="modal-profile">
          <div className="profile" style={{ height: 400 }}>
            <h5 style={{ color: "#1a1a2e", textTransform: "uppercase" }}>
              Infor Account
            </h5>
            <table className="table">
              <tbody style={{ fontSize: "200%" }}>
                <tr>
                  <td>ID</td>
                  <td style={{ color: "red" }}>{id}</td>
                </tr>
                <tr>
                  <td>Balannce</td>
                  <td style={{ color: "red" }}>
                    {balance} {CurrencyUnit.name}
                  </td>
                </tr>
                <tr>
                  <td>Maturity</td>
                  <td style={{ color: "red" }}>{date}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td style={{ color: "red" }}>{ServiceType.name}</td>
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
