import React, { PureComponent } from "react";
import Loading from "../Loading";
import { api } from "./api";
import Notification from "./Notification";
import { Redirect } from "react-router-dom";
class Verify extends PureComponent {
  constructor() {
    super();
    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    let redirect = token === "" ? true : false;

    this.state = {
      listUserVeri: [],
      isLoading: false,
      redirect,
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
      .then(({ data }) => {
        if (data.data) {
          this.setState({
            listUserVeri: data,
            isLoading: true,
          });
        }
      })
      .catch((err) => {
        if (err.response.status) {
          if (err.response.status === 400) {
            Notification("Opps something went wrong!!!", "error", false);
            this.setState({
              isLoading: true,
            });
          }
          if (err.response.status === 401) {
            Notification("You have Logout", "warning", 3000);
            this.setState({
              redirect: true,
            });
          }
        }
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
            <img style={{ width: 200, height: 100 }} src={item.backCart} />
          </td>

          <td style={{ maxWidth: 100 }}>
            <td style={{ border: "none" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.handleVeri(item.id, 1)}
              >
                Accept
              </button>
            </td>

            <td style={{ border: "none" }}>
              <button
                type="button"
                className="btn  btn-danger"
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
      data = 1;
    } else {
      data = -1;
    }
    api
      .put(`./verifyHandle/${id}`, data)
      .then((res) => {})
      .catch((err) => {
        Notification("Opps something went wrong!!!", "error", 3000);
      });
    let index = this.findIndex(id);
    this.state.listUserVeri.splice(index, 1);
    this.setState({
      listUserVeri: [...this.state.listUserVeri],
    });
  };
  render() {
    let { isLoading, redirect } = this.state;
    if (redirect) {
      localStorage.removeItem("token");
      return <Redirect to="/login" />;
    }
    if (!isLoading) {
      return <Loading />;
    }
    return (
      <div
        style={{
          marginTop: 100,
          height: "auto",
          minHeight: "100%",
        }}
      >
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>VERIFY USER</h3>
          </div>

          <table className="table table-bordered">
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
