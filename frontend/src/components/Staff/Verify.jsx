import React, { Component } from "react";
import { PureComponent } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

class Verify extends PureComponent {
  render() {
    return (
      <div
        style={{ marginTop: 150, height: "100vh", backgroundColor: "#ffffdd" }}
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
            <tbody>
              <tr>
                <td>Content 1</td>
                <td>Content 1</td>
                <td>Content 1</td>
                <td>Content 1</td>
                <td style={{ maxWidth: 100 }}>
                  <td style={{ border: "none" }}>
                    <button type="button" class="btn btn-primary">
                      <FaCheck />
                    </button>
                  </td>

                  <td style={{ border: "none" }}>
                    <button type="button" class="btn  btn-danger">
                      <FaTimes />
                    </button>
                  </td>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Verify;
