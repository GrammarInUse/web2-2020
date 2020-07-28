import React, { PureComponent } from "react";
import { FaSearch } from "react-icons/fa";
export default class PaymentAccount extends PureComponent {
  render() {
    return (
      <div
        style={{
          marginTop: 150,
          height: 500,
          minHeight: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="search">
          <table class="table find-history">
            <thead>
              <tr>
                <th>Transaction history</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="date" name="start" />
                </td>
                <td>
                  <input type="date" name="end" />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{ width: 40, height: 40 }}
                  >
                    <FaSearch />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Account Details</h3>
          </div>
          <div class="panel-body account-payment">
            <div>
              <label> Account number:</label>
              <label>38102831208</label>
            </div>
            <div>
              <label>Account holder:</label>
              <label>100000</label>
            </div>

            <div>
              <label>Account holder:</label>

              <label> do ba noi </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
