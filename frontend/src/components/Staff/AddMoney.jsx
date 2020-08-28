import React, { Component } from "react";
import { api } from "./api";
const token = localStorage.getItem("token") || "";
api.defaults.headers["authorization"] = `bearer ${token} `;
export default class AddMoney extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
    };
  }
  onChange = (e) => {
    this.setState({
      balance: e.target.value,
    });
  };
  AddMoney = (e) => {
    e.preventDefault();

    api
      .put(`/recharge/${this.props.Account.id}`, {
        balance: this.state.balance,
      })
      .then((res) => {
        console.log(res);
        Notification("Add Money Success!!!", "success", 3000);
        this.props.onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        Notification("Opps something went wrong!!!", "error", false);
      });
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
                      <input
                        onChange={this.onChange}
                        name="balance"
                        type="number"
                      />
                    </td>
                  </tr>
                </tbody>
                <button className="btn btn-primary" type="submit">
                  Add
                </button>
              </table>
            </form>
            <a id="close" onClick={() => this.props.onCloseModal()}>
              x
            </a>
          </div>
        </div>
      </div>
    );
  }
}
