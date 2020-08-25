import React, { Component } from "react";
import { api } from "./api";
import ModalHistory from "./ModalHistory";
let transaction = {};
export default class History extends Component {
  constructor() {
    super();

    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      listHis: [],
      key: "",
      type: 1,
      isOpen: false,
    };
  }
  componentDidMount() {
    api
      .get("/getHistoryTransaction")
      .then((res) => {
        console.log(res);
        if (res.data.result === "ok") {
          this.setState({
            listHis: res.data.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  showHistory = (his) => {
    transaction = his;
    this.setState({
      isOpen: true,
    });
  };
  closeModal = () => {
    transaction = {};
    this.setState({
      isOpen: false,
    });
  };
  listHistory = () => {
    let listHis = this.state.listHis;
    let list = listHis.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.Account.id}</td>
          <td>{item.Account.username}</td>
          <td>{item.Account.email}</td>
          <td>
            <a href="#" onClick={() => this.showHistory(item.transaction)}>
              {item.transaction.content}
            </a>
          </td>
        </tr>
      );
    });
    return list;
  };

  render() {
    return (
      <div
        style={{
          marginTop: 100,
          height: "auto",
          minHeight: "100%",
        }}
      >
        <h3>History Transaction</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>{this.listHistory()}</tbody>
        </table>
        {this.state.isOpen ? (
          <ModalHistory
            closeModal={this.closeModal}
            transaction={transaction}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
