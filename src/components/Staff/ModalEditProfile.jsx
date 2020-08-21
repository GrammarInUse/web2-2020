import React, { PureComponent } from "react";
import { api } from "./api";
import "./style.css";

class ModalEditProfile extends PureComponent {
  constructor(props) {
    super(props);
    let { staff } = props;
    this.state = {
      accountId: staff.accountId,
      name: staff.fullname,
      position: staff.position,
      salary: staff.salary,
      role: staff.role,
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
    let { name, position, salary } = this.state;
    const re = /^[A-Za-z]*$/;
    const sa = /^\d+$/;
    //const em = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    let nameErr = "";
    let posErr = "";
    let salErr = "";

    let isName = re.test(this.removeAscent(name));
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
    if (!name) {
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
    let { name, position, email, salary, role } = this.state;
    let data = { name, position, email, salary, role };
    await api
      .post("/addStaff/", data)
      .then((res) => {
        this.props.onGetAll();
      })
      .catch((err) => {
        console.log(err + "");
      });
  };
  updateStaff = async () => {
    let { name, position, salary, role } = this.state;
    let data = { name, position, salary, role };
    await api
      .put(`/editStaff/${this.state.accountId}`, data)
      .then((res) => {
        if (res.data.result === "ok") {
          this.props.onGetAll();
        }
      })
      .catch((err) => {
        console.log(err + "");
      });
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (name === "role") {
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
      if (this.state.id === null) {
        this.createStaff();
      } else {
        this.updateStaff();
      }
      this.closeModal();
    }
  };
  render() {
    let {
      validate,
      id,
      name,
      position,
      salary,
      role,
      email,
      nameErr,
      posErr,
      salErr,
    } = this.state;

    return (
      <div>
        <div className="modal-profile">
          <div className="profile">
            <h3>{id !== null ? "Edit" : "Add"} Profile</h3>
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
                      name="name"
                      value={name}
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
                    <select name="role" id="select" onChange={this.onChange}>
                      <option value="1">Watch</option>
                      <option value="2">Edit</option>
                    </select>
                  </td>
                </tr>
              </tbody>

              <button type="submit" className="btn btn-sm btn-success">
                {id !== null ? "UPDATE" : "ADD"}
              </button>
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
