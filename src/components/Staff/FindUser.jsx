import React, { Component } from "react";
import { api } from "./api";
import Loading from "../Loading";
import Account from "./Account";
import { Redirect } from "react-router-dom";
import AccountEdit from "./AccountEdit";
let account = {};
export default class FindUser extends Component {
  constructor() {
    super();
    const token = localStorage.getItem("token") || "";
    api.defaults.headers["authorization"] = `bearer ${token} `;
    this.state = {
      listUser: [],
      key: "",
      isLoading: false,
      isOpenModal: false,
      isOpenModalEdit: false,
      redirect: false,
    };
  }
  getAll = async () => {
    api
      .get("/find-user")
      .then(({ data }) => {
        if (data.result === "Ok") {
          this.setState({
            listUser: data.data,
            isLoading: true,
            isOpenModal: false,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message) {
          if (err.message === "timeout of 2000ms exceeded") {
            this.setState({
              redirect: true,
            });
          }
        }
      });
  };
  componentDidMount() {
    this.getAll();
  }

  onChange = (e) => {
    let key = e.target.value;
    this.setState({
      key,
    });
  };
  onShowModal = (i) => {
    account = i;
    this.setState({
      isOpenModal: true,
    });
  };
  onShowModalEdit = (i) => {
    account = i;
    this.setState({
      isOpenModalEdit: true,
    });
  };
  onCloseModalEdit = () => {
    this.setState({
      isOpenModalEdit: false,
    });
  };
  onCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  render() {
    let {
      key,
      listUser,
      isLoading,
      isOpenModal,
      redirect,
      isOpenModalEdit,
    } = this.state;
    if (redirect) {
      return <Redirect to="/503page" />;
    }
    if (!isLoading) {
      return <Loading />;
    }

    if (key) {
      listUser = listUser.filter((user) => {
        return user.name.toLowerCase().indexOf(key) !== -1;
      });
    }

    let list = listUser.map((i, index) => {
      return (
        <tr key={index}>
          <td>{i.Account.id}</td>
          <td>{i.Account.username}</td>
          <td>{i.Account.email}</td>
          <td>
            <div>
              <button
                style={{ marginRight: 10 }}
                onClick={() => this.onShowModal(i)}
                className="btn btn-primary"
              >
                Watch
              </button>

              <button
                onClick={() => this.onShowModalEdit(i)}
                className="btn btn-primary"
              >
                ADD
              </button>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <div
        style={{
          marginTop: 100,
          height: "auto",
          minHeight: "100%",
        }}
      >
        <div class="panel-heading">
          <h3>LIST USER</h3>
        </div>
        <div className="find" style={{ float: "left", marginLeft: 10 }}>
          <label style={{ paddingRight: 10 }}>Search</label>

          <input type="text" name="key" value={key} onChange={this.onChange} />
        </div>
        <div class="panel panel-default">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
        {isOpenModal ? (
          <Account Account={account} onCloseModal={this.onCloseModal} />
        ) : (
          ""
        )}
        {isOpenModalEdit ? (
          <AccountEdit
            Account={account}
            onCloseModalEdit={this.onCloseModalEdit}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
