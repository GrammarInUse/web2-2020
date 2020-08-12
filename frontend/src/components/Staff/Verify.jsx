import React, { PureComponent } from "react";
import { api } from "./api";
class Verify extends PureComponent {
  constructor() {
    super();
    this.state = {
      listVerify: [],
    };
  }
  getAll = async () => {
    const data = await api
      .get("/verify/")
      .then(({ data }) => data)
      .catch((err) => {
        console.log(err + "");
      });
    this.setState({
      listVerify: data,
    });
  };
  componentDidMount() {
    this.getAll();
  }
  showListVerify = () => {
    return this.state.listVerify.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <img style={{ width: 200, height: 100 }} src={item.frontCart} />
          </td>
          <td>
            <img style={{ width: 200, height: 100 }} src={item.backCart} />
          </td>
          <td>
            <td style={{ border: "none" }}>
              <button type="button" class="btn btn-primary">
                Accept
              </button>
            </td>

            <td style={{ border: "none" }}>
              <button type="button" class="btn  btn-danger">
                Deline
              </button>
            </td>
          </td>
        </tr>
      );
    });
  };
  render() {
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
            <h3>VERIFY USER</h3>
          </div>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th> ID </th>
                <th> Name </th>
                <th>Front-Card</th>
                <th>Back-Card</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>{this.showListVerify()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Verify;
