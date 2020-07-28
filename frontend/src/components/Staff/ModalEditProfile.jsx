import React, { PureComponent } from "react";
import "./style.css";

class ModalEditProfile extends PureComponent {
  constructor(props) {
    super(props);
    let { staff } = props;
    this.state = {
      name: staff.name,
      position: staff.position,
      salary: staff.salary,
      role: staff.role,
    };
  }
  closeModal = () => {
    this.setState({
      name: "",
      position: "",
      salary: 0,
      role: 1,
    });
    this.props.onToggleModal();
  };
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    console.log([name]);
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    let { name, position, salary, role } = this.state;

    return (
      <div>
        <div className="modal-profile">
          <div className="profile">
            <h3>Edit Profile</h3>
            <form className="formEdit" onSubmit={this.onSubmit}>
              <tbody>
                <tr>
                  <td>
                    <label>Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={name}
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
                      type="text"
                      name="position"
                      value={position}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Salary:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="salary"
                      value={salary}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Role:</label>
                  </td>
                  <td>
                    <select name="role" id="select" onChange={this.onChange}>
                      <option value={1}>Watch</option>
                      <option value={2} selected={role === 2 ? "selected" : ""}>
                        Fix
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>

              <button type="submit" className="btn btn-sm btn-success">
                Update
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
