import React, { Component } from "react";
import { FaPlus, FaEdit, FaLock, FaLockOpen } from "react-icons/fa";
import "./style.css";
import ModalEditProfile from "./ModalEditProfile";

import { api } from "./api";
import Loading from "../Loading";
import ServerError from "../ServerError";
let staff = {
  accountId: null,
  fullname: "",
  position: "",
  salary: 0,
  decentralizationId: 2,
  Account: {
    email: "",
  },
  isLocked: false,

  isLoading: 1,
};
class StaffManager extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      status: false,
      staffs: [],
    };
  }
  isLogout = () => {
    localStorage.removeItem("token");
    this.props.history.go("/");
  };

  getAll = async () => {
    api
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
        console.log(err);
        if (err.response) {
          if (typeof err.response.status) {
            if (err.response.status === 503) {
              this.setState({
                isLoading: 3,
              });
            } else {
              //this.isLogout();
            }
          }
        }
      });
  };
  Lock = (id) => {
    let index = this.findIndex(id);
    const staff = this.state.staffs[index];
    let { staffs } = this.state;
    api
      .put(`blockAccount/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.result === "ok") {
          staffs[index].isLocked = !staff.isLocked;
          this.setState({
            staffs: [...staffs],
          });
        }
      })
      .catch((err) => {
        console.log(err + "");
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
        <tbody key={index}>
          <tr id="listStaff">
            <td>{item.accountId}</td>
            <td>{item.fullname}</td>
            <td>{item.Account.email}</td>
            <td>{item.position}</td>
            <td>{item.salary}</td>
            <td>{role}</td>
            <td style={{ maxWidth: 100 }}>
              <td style={{ border: "none" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.toggleModal(item.accountId)}
                >
                  <FaEdit />
                </button>
              </td>

              <td style={{ border: "none" }}>
                <button
                  type="button"
                  className="btn  btn-danger"
                  onClick={() => this.onLock(item.accountId)}
                >
                  {item.isLocked ? <FaLock /> : <FaLockOpen />}
                </button>
              </td>
            </td>
          </tr>
        </tbody>
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
        isLocked: false,
        Account: {
          email: "",
        },
      };
    }
    this.setState({
      status: !this.state.status,
    });
  };

  render() {
    let { status, isLoading } = this.state;
    if (isLoading === 3) {
      return <ServerError />;
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
            {this.listStaff()}
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
