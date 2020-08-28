import React, { PureComponent } from "react";
import { api } from "./api";
import "./style.css";

class ModalEditProfile extends PureComponent {
  constructor(props) {
    super(props);
    let { staff } = props;
    const token = localStorage.getItem("token") || "";

    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      accountId: staff.accountId,
      fullname: staff.fullname,
      position: staff.position,
      salary: staff.salary,
      decentralizationId: staff.decentralizationId,
      email: staff.Account.email,

      nameErr: "",
      posErr: "",
      salErr: "",
    };
  }
  closeModal = () => {
    this.setState({
      idaccountId: null,
      name: "",
      position: "",
      salary: 0,
      role: 1,
      email: "",
    });
    this.props.onToggleModal();
  };
  removeAscent = (str) => {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\s/g, "");
    return str;
  };
  isvalid = () => {
    let { fullname, position, salary } = this.state;
    const re = /^[A-Za-z]*$/;
    const sa = /^\d+$/;
    //const em = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    let nameErr = "";
    let posErr = "";
    let salErr = "";

    let isName = re.test(this.removeAscent(fullname));
    let isPos = re.test(this.removeAscent(position));
    let isSal = sa.test(salary);

    if (!isName) {
      nameErr = "please enter name only characters !";
    }
    if (!isPos) {
      posErr = "please enter position only characters !";
    }
    if (!isSal) {
      salErr = "please enter position only number";
    }
    if (!fullname) {
      nameErr = "name cannot emty ";
    }
    if (!position) {
      posErr = "position cannot emty";
    }

    if (nameErr !== "" || posErr !== "" || salErr !== "") {
      this.setState({ nameErr, posErr, salErr });
      return false;
    }
    return true;
  };
  createStaff = async () => {
    let { fullname, position, email, salary, decentralizationId } = this.state;
    let data = { fullname, position, email, salary, decentralizationId };
    console.log(data);
    await api
      .post("/addStaff", data)
      .then((res) => {
        Notification("Add Success!!!", "success", 3000);
        this.props.onGetAll();
      })
      .catch((err) => {
        console.log(err);
        Notification("Opps something went wrong!!!", "error", 3000);
      });
  };
  updateStaff = async () => {
    let { fullname, position, email, salary, decentralizationId } = this.state;

    let data = {
      name: fullname,
      position,
      email,
      salary,
      role: decentralizationId,
    };
    await api
      .put(`/editStaff/${this.state.accountId}`, data)
      .then((res) => {
        if (res.data.result === "ok") {
          Notification("Update Success!!!", "success", 3000);
          this.props.onGetAll();
        }
      })
      .catch((err) => {
        Notification("Opps something went wrong!!!", "error", false);
      });
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (name === "decentralizationId") {
      value = value === "2" ? 2 : 1;
    }
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    if (this.isvalid()) {
      if (this.state.accountId === null) {
        this.createStaff();
      } else {
        this.updateStaff();
      }
      this.closeModal();
    }
  };
  render() {
    let {
      accountId,
      fullname,
      position,
      salary,
      decentralizationId,
      email,
      nameErr,
      posErr,
      salErr,
    } = this.state;

    return (
      <div>
        <div className="modal-profile">
          <div className="profile">
            <h3>{accountId !== null ? "Edit" : "Add"} Profile</h3>
            <form className="formEdit" onSubmit={this.onSubmit}>
              <tbody>
                <tr>
                  <td>
                    <label>Name:</label>
                  </td>
                  <td>
                    <input
                      id="name"
                      type="text"
                      name="fullname"
                      value={fullname}
                      onChange={this.onChange}
                    />
                    <span style={{ color: "red" }}>{nameErr}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email:</label>
                  </td>
                  <td>
                    <input
                      id="name"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Position:</label>
                  </td>
                  <td>
                    <input
                      id="position"
                      type="text"
                      name="position"
                      value={position}
                      onChange={this.onChange}
                    />
                    <span style={{ color: "red" }}>{posErr}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Salary:</label>
                  </td>
                  <td>
                    <input
                      id="salary"
                      type="number"
                      name="salary"
                      value={salary}
                      onChange={this.onChange}
                    />
                    <span style={{ color: "red" }}>{salErr}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Role:</label>
                  </td>
                  <td>
                    <select
                      name="decentralizationId"
                      id="select"
                      onChange={this.onChange}
                      defaultValue={decentralizationId === 1 ? "1" : "2"}
                    >
                      <option value="1">Staff</option>
                      <option value="2">Admin</option>
                    </select>
                  </td>
                </tr>
              </tbody>

              <div style={{ marginTop: "2em" }}>
                <button
                  style={{ marginLeft: 120, width: 150 }}
                  className="btn  btn-danger"
                  onClick={this.closeModal}
                >
                  Cancel
                </button>
                <button
                  style={{ marginLeft: 120, width: 150 }}
                  type="submit"
                  className="btn  btn-success"
                >
                  {accountId !== null ? "UPDATE" : "ADD"}
                </button>
              </div>
            </form>
            <a id="close" onClick={this.closeModal}>
              x
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalEditProfile;
