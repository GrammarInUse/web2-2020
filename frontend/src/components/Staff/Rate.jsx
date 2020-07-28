import React, { Component } from "react";
import { PureComponent } from "react";
import { FaCheck, FaTimes, FaPlus, FaEdit, FaLock } from "react-icons/fa";
import ModalEditRate from "./ModalEditRate";
const listRate = [
  { Id: 1, Term: "3 thang", rate: 0 },
  { Id: 2, Term: "3 thang", rate: 0 },
  { Id: 3, Term: "2 thang", rate: 10 },
  { Id: 4, Term: "3 thang", rate: 20 },
  { Id: 5, Term: "2 thang", rate: 0 },
  { Id: 6, Term: "6 thang", rate: 40 },
];
let rate = { id: null, Term: "", rate: 0 };
class Rate extends PureComponent {
  constructor() {
    super();
    this.state = {
      status: false,
    };
  }

  findIndex = (id) => {
    let index = -1;
    listRate.forEach((item, i) => {
      if (item.Id === id) {
        index = i;
      }
    });
    return index;
  };
  onToggleModal = (id) => {
    if (id) {
      let index = this.findIndex(id);
      if (index !== -1) {
        rate = listRate[index];
      }
    }
    this.setState({
      status: !this.state.status,
    });
  };
  listRate = () => {
    return listRate.map((item, index) => {
      return (
        <tr>
          <td>{item.Id}</td>
          <td>{item.Term}</td>
          <td>{item.rate} %</td>

          <td style={{ maxWidth: 100 }}>
            <td style={{ border: "none" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.onToggleModal(item.Id)}
              >
                <FaEdit />
              </button>
            </td>

            <td style={{ border: "none" }}>
              <button type="button" class="btn  btn-danger">
                <FaLock />
              </button>
            </td>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { status } = this.state;

    return (
      <div
        style={{
          marginTop: 150,
          height: "auto",
          minHeight: "100%",
          backgroundColor: "#ffffdd",
        }}
      >
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3>RATE %</h3>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            style={{ width: 40, height: 40 }}
          >
            <FaPlus />
          </button>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th> ID </th>
                <th> Term </th>
                <th>Rate</th>

                <th>Handle</th>
              </tr>
            </thead>
            <tbody>{this.listRate()}</tbody>
          </table>
        </div>
        {status === true ? (
          <ModalEditRate onToggleModal={this.onToggleModal} rate={rate} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Rate;
