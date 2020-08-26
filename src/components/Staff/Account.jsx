import React, { Component } from "react";
import { api } from "./api";
import Notification from "./Notification";
import AddMoney from "./AddMoney";
let Acc = { id: null, Account: {} };
export default class Account extends Component {
  constructor() {
    super();

    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      isOpen: false,
    };
  }
  closeModal = () => {
    this.props.onCloseModal();
  };
  onOpenModal = (acc) => {
    Acc = acc;
    this.setState({
      isOpen: true,
    });
  };
  onDelete = (id) => {
    if (id) {
      api
        .delete(`/deleteService/${id}`)
        .then((res) => {
          console.log(res);
          if (res.data.message) {
            Notification(res.data.message, "dark", false);
          }
        })
        .catch((err) => {
          Notification(err.response.data.message, "warning", false);
        });
    }
    this.props.onCloseModal();
  };
  render() {
    let {
      balance,
      maturity,
      ServiceType,
      CurrencyUnit,
      id,
      Account,
      isOpen,
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
            <div>
              {ServiceType.id === 0 ? (
                ""
              ) : (
                <button
                  onClick={() => this.onDelete(id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
            </div>
            <a id="close" onClick={this.closeModal}>
              x
            </a>
          </div>
        </div>
      </div>
    );
  }
}
