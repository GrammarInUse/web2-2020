import React, { Component } from "react";
import { api } from "./api";

export default class ModalEditRate extends Component {
  constructor(props) {
    super(props);
    let { id, rate, term } = props.rate;

    this.state = {
      id,
      rate,
      term,
    };
  }
  createRate = async () => {
    let { rate, term } = this.state;
    let data = { rate, term, isLock: false };
    await api
      .post("/rate/", data)
      .then((res) => {
        console.log(res);
        this.props.onGetAll();
      })
      .catch((err) => {
        console.log(err + "");
      });
  };
  updateRate = async () => {
    let { id, rate, term } = this.state;
    let data = { rate, term };
    await api
      .put(`/rate/${id}`, data)
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
      rete: "",
      term: "",
    });
    this.props.onToggleModal();
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.id === null) {
      this.createRate();
    } else {
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
    const { id, term, rate } = this.state;

    return (
      <div>
        <div className="modal-profile">
          <div className="profile">
            <h3>{id !== null ? "Edit" : "Add"} Rate</h3>
            <form className="formEdit" onSubmit={this.onSubmit}>
              <tbody>
                <tr>
                  <td>
                    <label>Term</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="term"
                      value={term}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Rate:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="rate"
                      value={rate}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
              </tbody>

              <button type="submit" className="btn btn-sm btn-success">
                {id ? "UPDATE" : "ADD"}
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
