import React, { Component } from "react";
import { api } from "./api";
import Notification from "./Notification";

export default class AccountEdit extends Component {
  constructor(props) {
    super(props);

    if (typeof this.props.Account === "string") {
      console.log(typeof this.props.Account);
      this.state = {
        idAccount: this.props.Account,
        balance: 0,
      };
    } else {
      let { id, Account, ServiceType } = this.props.Account;
      console.log(false);
      this.state = {
        balance: 0,
        name: 1,
        id,
        idAccount: Account.id,
      };
    }
  }
  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  closeModal = () => {
    this.props.onCloseModalEdit();
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    if (!this.state.id) {
      let curBalance = this.state.balance;
      api
        .put(`/recharge/${this.state.idAccount}`, curBalance)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.closeModal();
      return;
    }
    let { idAccount, name, balance } = this.state;

    if (name === "1") {
      name = 1;
    } else if (name === "2") {
      name = 2;
    } else if (name === "3") {
      name = 3;
    } else if (name === "4") {
      name = 4;
    }

    api
      .post(`/createService/${idAccount}`, { servicetype: name, balance })
      .then(({ data }) => {
        if (data.result === "ok") {
          Notification("Add complete!!!", "error", 3000);
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          if (
            err.response.data.message ===
            "You can't create one more saving Account!!!"
          ) {
            Notification(
              "You can't create one more saving Account!!!",
              "error",
              3000
            );
          }
        } else {
          Notification("Ops err", "error", 3000);
        }
      });
    this.closeModal();
  };
  render() {
    let { balance } = this.state;
    return (
      <div style={{ marginTop: 100 }}>
        <div className="modal-profile">
          <div className="profile" style={{ height: 300 }}>
            <h5 style={{ color: "#1a1a2e", textTransform: "uppercase" }}>
              {this.state.id ? "ADD Account" : "ADD Money"}
            </h5>

            <form className="formEdit" onSubmit={this.onSubmit}>
              <tbody>
                {this.state.id ? (
                  <tr>
                    <td>
                      <label>Name</label>
                    </td>
                    <td>
                      <select name="name" onChange={this.onChange}>
                        <option value={1}>3 thang</option>
                        <option value={2}>6 thang</option>
                        <option value={3}>9 thang</option>
                        <option value={4}>12 thang</option>
                      </select>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                <tr>
                  <td>
                    <label>balance</label>
                  </td>
                  <td>
                    <input
                      value={balance}
                      type="number"
                      name="balance"
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
              </tbody>
              <div style={{ marginTop: "2em" }}>
                <button
                  style={{ marginLeft: 120, width: 150 }}
                  className="btn  btn-danger"
                  onClick={this.closeModal}
                >
                  CANCEL
                </button>
                <button
                  style={{ marginLeft: 120, width: 150 }}
                  type="submit"
                  className="btn  btn-success"
                >
                  ADD
                </button>
              </div>
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
