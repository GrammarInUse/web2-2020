import React, { PureComponent } from "react";
import { FaEdit, FaLock, FaLockOpen, FaPlus } from "react-icons/fa";
import Loading from "../Loading";
import { api } from "./api";
import ModalEditRate from "./ModalEditRate";

let rate = { id: null, name: "", value: 0, maturity: null };
class Rate extends PureComponent {
  constructor() {
    super();
    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      status: false,
      listRate: [],
      isLoading: false,
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
      rate = { id: null, name: "", value: 0, maturity: 0 };
    }
    this.setState({
      status: !this.state.status,
    });
  };

  listRate = () => {
    return this.state.listRate.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.value} %</td>

          <td>{item.maturity === null ? 0 : item.maturity}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => this.onToggleModal(item.id)}
            >
              <FaEdit />
            </button>
          </td>
        </tr>
      );
    });
  };
  getAll = async () => {
    await api
      .get("/rate/")
      .then(({ data }) => {
        if (data.data) {
          this.setState({
            listRate: data.data,
            isLoading: true,
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
  render() {
    const { status, isLoading } = this.state;

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
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3>RATE </h3>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th> ID </th>
                <th> Name </th>
                <th>Value</th>

                <th>Maturity</th>
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
