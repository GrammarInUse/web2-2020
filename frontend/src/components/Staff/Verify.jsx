import React, { Component } from "react";
import { PureComponent } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { api } from "./api";
class Verify extends PureComponent {
  constructor() {
    super();
    this.state = {
      listUserVeri: [],
    };
  }
  findIndex = (id) => {
    let list = this.state.listUserVeri;
    let index = -1;
    list.forEach((item, i) => {
      if (item.id === id) {
        index = i;
      }
    });
    return index;
  };
  getAll = async () => {
    let data = await api
      .get("/verify/")
      .then(({ data }) => data)
      .catch((err) => []);
    this.setState({
      listUserVeri: data,
    });
  };
  componentDidMount() {
    this.getAll();
  }
  listVeri = () => {
    return this.state.listUserVeri.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <img style={{ width: 200, height: 100 }} src={item.frontCart} />
          </td>
          <td>
            <img
              style={{ width: 200, height: 100 }}
              src={item.backCart}
              alt=""
            />
          </td>

          <td style={{ maxWidth: 100 }}>
            <td style={{ border: "none" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.handleVeri(item.id, 1)}
              >
                Accept
              </button>
            </td>

            <td style={{ border: "none" }}>
              <button
                type="button"
                class="btn  btn-danger"
                onClick={() => this.handleVeri(item.id, 2)}
              >
                Deline
              </button>
            </td>
          </td>
        </tr>
      );
    });
  };
  handleVeri = (id, flag) => {
    let data = {};
    if (flag === 1) {
      data = { isVerified: 1 };
    } else {
      data = { isVerified: -1 };
    }
    api
      .put(`./verify/${id}`, data)
      .then((res) => {})
      .catch((err) => {
        alert(err + "");
        return;
      });
    let index = this.findIndex(id);
    this.state.listUserVeri.splice(index, 1);
    this.setState({
      listUserVeri: [...this.state.listUserVeri],
    });
  };
  render() {
    return (
      <div
        style={{
          marginTop: 150,
          height: "auto",
          minHeight: "100%",
          backgroundColor: "#ffffdd",
        }}
      >
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3>VERIFY USER</h3>
          </div>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th style={{ with: "10%" }}> ID </th>
                <th style={{ width: "20%" }}> Name </th>
                <th style={{ width: "30%" }}>Front-Card</th>
                <th style={{ width: "30%" }}>Back-Card</th>
                <th style={{ width: "20%" }}>Handle</th>
              </tr>
            </thead>
            <tbody>{this.listVeri()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Verify;
