import React, { Component } from "react";
import { FaEdit, FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import { api } from "./api";
import ModalEditProfile from "./ModalEditProfile";
import "./style.css";

let staff = {
  id: null,
  name: "",
  position: "",
  salary: 0,
  role: 1,
  isLock: false,
};

class StaffManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      staffs: [],
    };
  }
  getAll = async () => {
    let staffs = await api.get("/test/").then(({ data }) => data);

    this.setState({
      staffs,
    });
  };
  Lock = (id) => {
    let index = this.findIndex(id);
    const staff = this.state.staffs[index];
    let { staffs } = this.state;
    api
      .put(`test/${id}`, { isLock: !staff.isLock })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err + "");
      });
    staffs[index].isLock = !staff.isLock;
    this.setState({
      staffs: [...staffs],
    });
  };
  componentDidMount() {
    this.getAll();
  }
  findIndex = (id) => {
    let staffs = this.state.staffs;
    let index = -1;
    staffs.forEach((item, i) => {
      if (item.id === id) {
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
      let role = item.role ? "watch" : "edit";

      return (
        <tbody key={index}>
          <tr id="listStaff">
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.position}</td>
            <td>{item.salary}</td>
            <td>{role}</td>
            <td style={{ maxWidth: 100 }}>
              <td style={{ border: "none" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.toggleModal(item.id)}
                >
                  <FaEdit />
                </button>
              </td>

              <td style={{ border: "none" }}>
                <button
                  type="button"
                  className="btn  btn-danger"
                  onClick={() => this.onLock(item.id)}
                >
                  {item.isLock ? <FaLock /> : <FaLockOpen />}
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
        id: null,
        name: "",
        position: "",
        salary: 0,
        role: 1,
        isLock: false,
      };
    }
    this.setState({
      status: !this.state.status,
    });
  };

  render() {
    let { status } = this.state;

    return (
      <div
        style={{
          marginTop: 150,
          height: "auto",
          minHeight: "100%",
          backgroundColor: "#ffffdd",
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
