import React, { Component } from "react";
import { api } from "./api";
const token = localStorage.getItem("token") || "";
api.defaults.headers["authorization"] = `bearer ${token} `;
export default class AddMoney extends Component {
  AddMoney = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    api
      .put(`/recharge/${this.props.Account.Account.id}`, { name: value })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.respone.data.err) {
          if (
            err.response.data.error ===
            "Authentication Failed ! JsonWebTokenError: jwt malformed"
          ) {
            localStorage.removeItem("token");
          }
        }
      });
    this.props.onCloseModal();
  };
  closeModal = () => {
    this.props.onCloseModal();
  };
  render() {
    let { id, Account } = this.props.Account;
    return (
      <div style={{ marginTop: 100 }}>
        <div className="modal-profile">
          <div className="profile">
            <h4>ADD MONEY</h4>
            <form className="formEdit" onSubmit={this.AddMoney}>
              <table className="table">
                <tbody style={{ fontSize: "200%" }}>
                  <tr>
                    <td>
                      <label>AccontID</label>
                    </td>
                    <td>
                      <span>{Account.id}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Name</label>
                    </td>
                    <td>
                      <span>{Account.username}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Money</td>
                    <td>
                      <input name="curBalance" type="number" />
                    </td>
                  </tr>
                </tbody>
                <button className="btn btn-primary" type="submit">
                  Add
                </button>
              </table>
            </form>
            <a id="close" onClick={this.closeModal}>
              x
            </a>
          </div>
        </div>
      </div>
    );
  }
}
