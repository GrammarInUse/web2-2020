import React, { Component } from "react";
import { FaPlus, FaEdit ,FaLock, FaLockOpen} from "react-icons/fa";
import "./style.css";
import ModalEditProfile from "./ModalEditProfile";
import Rate from "./Rate";
const staffs = [
  { id: 1, name: "vu van leo", position: "lao cong", salary: 2000, role: 1 ,isLock:false},
  { id: 2, name: "tran thi a", position: "lao cong", salary: 2000, role: 2 },
  { id: 3, name: "vu van leo", position: "lao cong", salary: 2000, role: 1 },
  { id: 4, name: "tran thi a", position: "lao cong", salary: 2000, role: 2 },
  { id: 5, name: "vu van leo", position: "lao cong", salary: 2000, role: 1 },
  { id: 6, name: "tran thi a", position: "lao cong", salary: 2000, role: 2 },
  { id: 7, name: "vu van leo", position: "lao cong", salary: 2000, role: 1 },
];
let staff = { id: null, name: "", position: "", salary: null, role: 1 ,isLock:false};
class StaffManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      staffs
    };
  }
  findIndex = (id) => {
    let index = -1;
    staffs.forEach((item, i) => {
      if (item.id === id) {
        index = i;
      }
    });
    return index;
  };
  onLock=(id)=>{
    let index=this.findIndex(id)
    this.setState({
      staffs:[...this.state.staffs,
        this.state.staffs[index].isLock=!this.state.staffs[index].isLock
        
      ]
    })
  }
  listStaff = () => {
    let list = staffs.map((item, index) => {
      let role = item.role === 1 ? "watch" : "edit";
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
                  <FaEdit/>
                </button>
              </td>

              <td style={{ border: "none" }}>
                <button
                 type="button" 
                 className="btn  btn-danger"
                 onClick={()=>this.onLock(item.id)}
                 >
                {item.isLock?<FaLock/>:<FaLockOpen/>}
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
    if (id) {
      let index = this.findIndex(id);
      if (index !== -1) {
        staff = staffs[index];
      }
    }
    else{
      staff={ id: null, name: "", position: "", salary: null, role: 1,isLock:false };
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
          <FaPlus color="blue" cursor="pointer" size="40px" onClick={this.toggleModal}/>

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
          <ModalEditProfile staff={staff} onToggleModal={this.toggleModal} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default StaffManager;
