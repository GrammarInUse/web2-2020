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

    this.state = {
      listUserVeri: [],
      isLoading: false,
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
            listUserVeri: data.data,
            isLoading: true,
          });
        }
      })
      .catch((err) => {
        Notification("Opps something went wrong!!!", "error", false);
        this.setState({ isLoading: true });
      });
  };
  componentDidMount() {
    this.getAll();
  }
  listVeri = () => {
    let listUserVeri = this.state.listUserVeri;
    let list = listUserVeri.map((item, index) => {
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
                onClick={() => this.handleVeri(item.id, "1")}
              >
                Accept
              </button>
            </td>

            <td style={{ border: "none" }}>
              <button
                type="button"
                className="btn  btn-danger"
                onClick={() => this.handleVeri(item.id, "-1")}
              >
                Deline
              </button>
            </td>
          </td>
        </tr>
      );
    });
    return list;
  };
  handleVeri = (id, flag) => {
    let data = flag;

    api
      .put(`./verifyHandle/${id}`, { data })
      .then((res) => {
        Notification("Successfully!!!", "success", 3000);
      })
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
    let list = this.listVeri();

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
            <tbody>{list ? list : <h2>no data</h2>}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Verify;
