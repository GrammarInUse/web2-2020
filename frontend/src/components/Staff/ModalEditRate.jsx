import React, { Component } from "react";
import { api } from "./api";

export default class ModalEditRate extends Component {
  constructor(props) {
    super(props);
    let { id, name, value, maturity } = props.rate;
    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      id,
      name,
      value,
      maturity,
    };
  }

  updateRate = async () => {
    console.log(this.state);
    await api
      .put(`/editRate/${this.state.id}`, this.state)
      .then((res) => {
        console.log(res);
        this.props.onGetAll();
      })
      .catch((err) => {
        console.log(err + "");
      });
  };
  closeModal = () => {
    this.setState({
      id: null,
      name: "",
      value: 0,
      maturity: 0,
    });
    this.props.onToggleModal();
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.id !== null) {
      this.updateRate();
    }
    this.closeModal();
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value,
    });
  };
  render() {
    const { id, name, value, maturity } = this.state;

    return (
      <div>
        <div className="modal-profile">
          <div className="profile">
            <h3>Edit Rate</h3>
            <form className="formEdit" onSubmit={this.onSubmit}>
              <tbody>
                <tr>
                  <td>
                    <label>Name</label>
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
                    <label>Value:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      s
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>maturity:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="maturity"
                      value={maturity}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
              </tbody>

              <div style={{ marginTop: "2em" }}>
                <button
                  style={{ marginLeft: 120, width: 150 }}
                  className="btn  btn-danger"
                  onClick={this.closeModal}
                >
                  CANCEL
                </button>
                <button
                  style={{ marginLeft: 120, width: 150 }}
                  type="submit"
                  className="btn  btn-success"
                >
                  UPDATE
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
