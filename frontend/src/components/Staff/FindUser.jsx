import React, { Component } from "react";
import { api } from "./api";

export default class FindUser extends Component {
  constructor() {
    super();
    this.state = {
      listUser: [],
      key: "",
    };
  }
  getAll = async () => {
    api
      .get("/find-user/")
      .then(({ data }) => {
        this.setState({
          listUser: data,
        });
      })
      .catch((err) => {
        alert(err + "");
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

  render() {
    let { key, listUser } = this.state;

    if (key) {
      listUser = listUser.filter((user) => {
        return user.name.toLowerCase().indexOf(key) !== -1;
      });
    }

    let list = listUser.map((i, index) => {
      return (
        <tr key={index}>
          <td>{i.id}</td>
          <td>{i.name}</td>
        </tr>
      );
    });
    return (
      <div
        style={{
          marginTop: 150,
          height: "auto",
          minHeight: "100%",
          backgroundColor: "#ffffdd",
        }}
      >
        <div className="find">
          <label>Timf kiem</label>
          <input type="text" name="key" value={key} onChange={this.onChange} />
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3>LIST USER</h3>
          </div>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
