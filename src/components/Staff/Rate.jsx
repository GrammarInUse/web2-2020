import React, { PureComponent } from "react";
import { FaEdit, FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import Loading from "../Loading";
import { api } from "./api";
import ModalEditRate from "./ModalEditRate";
import Notification from "./Notification";
import { Redirect } from "react-router-dom";

let rate = { id: null, name: "", value: 0, maturity: null };
class Rate extends PureComponent {
  constructor() {
    super();
    const token = localStorage.getItem("token") || "";
    let redirect = token === "" ? true : false;
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      status: false,
      listRate: [],
      isLoading: false,
      redirect,
    };
  }

  findIndex = (id) => {
    let index = -1;

    this.state.listRate.forEach((item, i) => {
      if (item.id === id) {
        index = i;
      }
    });
    return index;
  };
  onToggleModal = (id) => {
    if (id) {
      let index = this.findIndex(id);
      if (index !== -1) {
        rate = this.state.listRate[index];
      }
    } else {
      rate = { id: null, name: "", value: 0, maturity: 0 };
    }
    this.setState({
      status: !this.state.status,
    });
  };

  listRate = () => {
    return this.state.listRate.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.value} %</td>

          <td>{item.maturity === null ? 0 : item.maturity}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => this.onToggleModal(item.id)}
            >
              <FaEdit />
            </button>
          </td>
        </tr>
      );
    });
  };
  getAll = async () => {
    await api
      .get("/rate/")
      .then(({ data }) => {
        if (data.data) {
          this.setState({
            listRate: data.data,
            isLoading: true,
          });
        }
      })
      .catch((err) => {
        if (err.respone) {
          if (err.respone.data.error) {
            if (
              err.response.data.error ===
              "Authentication Failed ! JsonWebTokenError: jwt malformed"
            ) {
              Notification("You have logout!!!", "warning", 3000);
              this.setState({
                redirect: true,
              });
            }
          }
        }
      });
  };
  componentDidMount() {
    this.getAll();
  }
  render() {
    const { status, isLoading, redirect } = this.state;
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
            <h3>RATE </h3>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th> ID </th>
                <th> Name </th>
                <th>Value</th>

                <th>Maturity</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>{this.listRate()}</tbody>
          </table>
        </div>
        {status === true ? (
          <ModalEditRate
            onToggleModal={this.onToggleModal}
            rate={rate}
            onGetAll={this.getAll}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Rate;
