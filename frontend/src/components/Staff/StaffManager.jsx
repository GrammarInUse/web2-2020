import React, { Component } from "react";
import { FaPlus, FaEdit, FaLock, FaLockOpen } from "react-icons/fa";
import "./style.css";
import ModalEditProfile from "./ModalEditProfile";

import { api } from "./api";
import Loading from "../Loading";
import ServerError from "../ServerError";

import { Redirect } from "react-router-dom";
import Notification from "./Notification";

let staff = {
  accountId: null,
  fullname: "",
  position: "",
  salary: 0,
  decentralizationId: 2,
  Account: {
    email: "",
    isBlocked: false,
  },
};
class StaffManager extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token") || "";

    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      isLoading: false,
      status: false,
      staffs: [],
    };
  }

  Lock = (id) => {
    let index = this.findIndex(id);
    const staff = this.state.staffs[index];
    let { staffs } = this.state;
    api
      .put(`blockAccount/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.result === "ok") {
          let isBlocked = !staffs[index].Account.isBlocked;
          staffs[index].Account.isBlocked = isBlocked;

          this.setState({
            staffs: [...staffs],
          });
        }
      })
      .catch((err) => {
        Notification("Opps something went wrong!!!", "error", false);
      });
  };
  getAll = async () => {
    await api
      .get("/listStaff")
      .then(({ data }) => {
        if (data.data) {
          this.setState({
            staffs: data.data,
            isLoading: true,
          });
        }
      })
      .catch((err) => {
        Notification("You Opps something went wrong!!!", "error", 3000);
        this.setState({
          isLoading: true,
        });
      });
  };
  componentDidMount() {
    this.getAll();
  }
  findIndex = (id) => {
    let staffs = this.state.staffs;
    let index = -1;
    staffs.forEach((item, i) => {
      if (item.accountId === id) {
        index = i;
      }
    });
    return index;
  };
  onLock = async (id) => {
    this.Lock(id);
  };
  listStaff = () => {
    let staffs = this.state.staffs;
    let list = staffs.map((item, index) => {
      let role = item.decentralizationId === 1 ? "Staff" : "Admin";

      return (
        <tr key={index} id="listStaff">
          <td>{item.accountId}</td>
          <td>{item.fullname}</td>
          <td>{item.Account.email}</td>
          <td>{item.position}</td>
          <td>{item.salary}</td>
          <td>{role}</td>
          <td style={{ maxWidth: 100 }}>
            <button
              style={{ marginRight: 10 }}
              type="button"
              className="btn btn-primary"
              onClick={() => this.toggleModal(item.accountId)}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              className="btn  btn-danger"
              onClick={() => this.onLock(item.accountId)}
            >
              {item.Account.isBlocked ? <FaLock /> : <FaLockOpen />}
            </button>
          </td>
        </tr>
      );
    });
    return list;
  };

  toggleModal = (id) => {
    let staffs = this.state.staffs;
    if (id) {
      let index = this.findIndex(id);
      if (index !== -1) {
        staff = staffs[index];
      }
    } else {
      staff = {
        accountId: null,
        fullname: "",
        position: "",
        salary: 0,
        decentralizationId: 2,
        Account: {
          email: "",
          isBloced: false,
        },
      };
    }
    this.setState({
      status: !this.state.status,
    });
  };

  render() {
    let { status, isLoading } = this.state;
    console.log(isLoading);
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
            <h3>STAFF MANAGER</h3>
          </div>
          <FaPlus
            color="blue"
            cursor="pointer"
            size="40px"
            onClick={this.toggleModal}
          />

          <table className="table table-bordered">
            <thead>
              <tr>
                <th> ID </th>
                <th> Name </th>
                <th>Email</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Role</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>{this.listStaff()}</tbody>
          </table>
        </div>
        {status === true ? (
          <ModalEditProfile
            staff={staff}
            onToggleModal={this.toggleModal}
            onGetAll={this.getAll}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default StaffManager;
