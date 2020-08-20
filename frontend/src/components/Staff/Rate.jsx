import React, { Component } from "react";
import { PureComponent } from "react";
import {
  FaCheck,
  FaTimes,
  FaPlus,
  FaEdit,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import ModalEditRate from "./ModalEditRate";
import { api } from "./api";

let rate = { id: null, term: "", rate: 0, isLock: false };
class Rate extends PureComponent {
  constructor() {
    super();
    this.state = {
      status: false,
      listRate: [],
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
      rate = { id: null, term: "", rate: 0, isLock: false };
    }
    this.setState({
      status: !this.state.status,
    });
  };
  onLock = (id) => {
    const index = this.findIndex(id);

    api
      .put(`/rate/${id}`, { isLock: !this.state.listRate[index].isLock })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err + "");
      });
    let { listRate } = this.state;
    listRate[index].isLock = !listRate[index].isLock;
    this.setState({
      listRate: [...listRate],
    });
  };
  listRate = () => {
    return this.state.listRate.map((item, index) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.term}</td>
          <td>{item.rate} %</td>

          <td style={{ maxWidth: 100 }}>
            <td style={{ border: "none" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => this.onToggleModal(item.id)}
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
      );
    });
  };
  getAll = async () => {
    let data = await api
      .get("/rate/")
      .then(({ data }) => data)
      .catch((err) => {
        console.log(err + "");
      });
  };
  componentDidMount() {
    this.getAll();
  }
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
            onClick={this.onToggleModal}
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
