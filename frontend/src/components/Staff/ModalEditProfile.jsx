import React, { PureComponent } from "react";
import * as bootstrapValidate from 'bootstrap-validate';

import "./style.css";

class ModalEditProfile extends PureComponent {
  constructor(props) {
    super(props);
    let { staff } = props;
    this.state = {
      id: staff.id,
      name: staff.name,
      position: staff.position,
      salary: staff.salary,
      role: staff.role,

      validate:true
    };
  }
  closeModal = () => {
    this.setState({
      id: null,
      name: "",
      position: "",
      salary: 0,
      role: 1,
    });
    this.props.onToggleModal();

  };
  removeAscent=(str)=>{
    if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
  }
  isvalid=(string)=>{
    const re = /^[A-Za-z]*$/ 
      return re.test(this.removeAscent(string))
  }
  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
   console.log(this.isvalid(this.state.name))


  };
  render() {
    let {validate, id, name, position, salary, role } = this.state;
   

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

              <button 
              type="submit"
               className="btn btn-sm btn-success"
              disabled={validate===false?true:false}
                >
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
