import React, { Component } from "react";
import Notification from "./Notification";
import { api } from "./api";
import { Redirect } from "react-router-dom";
const token = localStorage.getItem("token") || "";

api.defaults.headers["authorization"] = `bearer ${token} `;
export default class WithDrawMoney extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      balance: 0,
    };
  }
  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };
  onSubmit = (e) => {
    e.preventDefault();
    let { id, balance } = this.state;
    console.log(balance);
    if (id === 0 || balance === 0) {
      Notification("id or money is not null!!!", "warning", 3000);
    } else {
      api
        .put(`/withDrawal/${id}`, { balance })
        .then((res) => {
          if (res.data.result === "ok") {
            Notification("Withdraw cash success !!!", "success", 3000);
            this.setState({
              id: 0,
              balance: 0,
            });
          } else {
            Notification("Withdraw cash failed !!!", "error", false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.status === 400) {
              if (err.response.data) {
                if (err.response.data.result === "failed") {
                  Notification(err.response.data.message, "error", false);
                }
              } else {
                Notification("Opps something went wrong!!!", "error", false);
              }
            }
          }
        });
    }
  };
  render() {
    if (token === "") {
      return <Redirect to="/" />;
    }
    let { id, balance } = this.state;
    return (
      <div
        style={{
          width: "50%",
          height: "60%",
          marginLeft: "25%",
          marginTop: 150,
          backgroundColor: "#e8ded2",
        }}
      >
        <h2>Withdraw Cash</h2>
        <form
          style={{
            height: "300px",
          }}
          onSubmit={this.onSubmit}
        >
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <label>ID</label>
                </td>
                <td>
                  <input
                    onChange={this.onChange}
                    name="id"
                    value={id}
                    class="form-control"
                    type="number"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>money</label>
                </td>
                <td>
                  <input
                    onChange={this.onChange}
                    name="balance"
                    value={balance}
                    class="form-control"
                    type="number"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            style={{ marginRight: -400, width: 200 }}
            className="btn btn-primary"
            type="submit"
          >
            send
          </button>
        </form>
      </div>
    );
  }
}
