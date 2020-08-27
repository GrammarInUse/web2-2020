import React, { Component } from "react";
import { api } from "./api";
import ModalHistory from "./ModalHistory";
import LoginForm from "../LoginForm";
import { Redirect } from "react-router-dom";
import Notification from "./Notification";
import Loading from "../Loading";
let transaction = {};
export default class History extends Component {
  constructor() {
    super();

    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      listHis: [],
      key: "",
      type: "1",
      isOpen: false,
      redirect: 0,
      isLoading: false,
    };
  }
  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  componentDidMount() {
    api
      .get("/getHistoryTransaction")
      .then((res) => {
        console.log(res);
        if (res.data.result === "ok") {
          this.setState({
            listHis: res.data.data,
            isLoading: true,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            this.setState({
              redirect: 1,
            });
          }
        }
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

  render() {
    let { key, type, redirect, listHis, isLoading } = this.state;
    if (!isLoading) {
      return <Loading />;
    }
    if (redirect === 1) {
      Notification("Opps something went wrong!!!!!!", "warning", 3000);
      return (
        <Redirect>
          <LoginForm isLogin={false} />
        </Redirect>
      );
    }
    if (key && type) {
      switch (type) {
        case "1":
          listHis = listHis.filter((i) => {
            return i.Account.id.indexOf(key) > -1;
          });
          break;
        case "2":
          listHis = listHis.filter((i) => {
            return (
              i.Account.username.toLowerCase().indexOf(key.toLowerCase()) > -1
            );
          });
          break;
        case "3":
          listHis = listHis.filter((i) => {
            return i.Account.email.indexOf(key) > -1;
          });
          break;
      }
    }
    let list = listHis.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.Account.id}</td>
          <td>{item.Account.username}</td>
          <td>{item.Account.email}</td>
          <td>
            <a
              className="text-hover"
              style={{
                textDecorationLine: "underline",
                textDecorationColor: "red",
                cursor: "pointer",
              }}
              onClick={() => this.showHistory(item.transaction)}
            >
              {item.transaction.content}
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div
        style={{
          marginTop: 100,
          height: "auto",
          minHeight: "100%",
        }}
      >
        <h3>History Transaction</h3>
        <div style={{ float: "left", marginBottom: 10 }}>
          <span>Search</span>
          <input
            style={{ marginLeft: 10, marginRight: 10 }}
            type="text"
            name="key"
            onChange={this.onChange}
          />
          <select name="type" onChange={this.onChange}>
            <option value={1}>By ID</option>
            <option value={2}>By Name</option>
            <option value={3}>By Email</option>
          </select>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
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
