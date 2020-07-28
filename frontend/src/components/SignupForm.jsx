import React from "react";
import { PureComponent } from "react";

export default class SignupForm extends PureComponent {
  render() {
    return (
      <div>
        <div id="id02" className="modal">
          <form
            className="modal-content animate"
            onSubmit={this.submitSignupHandler}
          >
            <div className="imgcontainer">
              <span
                onClick={() =>
                  (document.getElementById("id02").style.display = "none")
                }
                className="close"
                title="Close Modal"
              >
                ×
              </span>
              <img
                src="img/clients/client-1.png"
                alt="Avatar"
                className="avatar"
              />
            </div>
            <div className="container row">
              <label htmlFor="username">
                <b>Username: </b>
              </label>
              <input
                className="col-13"
                type="text"
                onChange={this.changeHandler}
                placeholder="Enter Username"
                name="username"
                required
              />
              <label htmlFor="password">
                <b>Password: </b>
              </label>
              <input
                className="col-13"
                type="password"
                onChange={this.changeHandler}
                placeholder="Enter Password"
                name="password"
                required
              />
              <label htmlFor="comfirmPassword">
                <b>Comfirm Password: </b>
              </label>
              <input
                type="password"
                onChange={this.changeHandler}
                placeholder="Enter comfirm Password"
                name="comfirmPassword"
                required
              />
              <label htmlFor="email">
                <b>Email: </b>
              </label>
              <input
                type="email"
                onChange={this.changeHandler}
                placeholder="Enter Your Email"
                name="email"
                required
              />
              <label htmlFor="fullName">
                <b>Full Name: </b>
              </label>
              <input
                type="text"
                onChange={this.changeHandler}
                placeholder="Enter Your Full Name"
                name="fullName"
                required
              />
              <br />
              <label htmlFor="phone">
                <b>Phone: </b>
              </label>
              <input
                type="text"
                onChange={this.changeHandler}
                placeholder="Enter Your Phone Number"
                name="phone"
                required
              />
              <br />

              <label
                style={{ marginTop: "20px" }}
                className="col-2"
                htmlFor="dOB"
              >
                <b>Date of Birth: </b>
              </label>
              <input
                style={{ marginTop: "20px" }}
                className="col-10"
                type="date"
                onChange={this.changeHandler}
                placeholder="Enter Your Birth Day"
                name="dOB"
                required
              />

              <label
                style={{ marginTop: "40px" }}
                className="col-1"
                htmlFor="sex"
              >
                <b>Sex: </b>
              </label>
              <select
                onChange={this.changeHandler}
                style={{ marginTop: "40px" }}
                className="col-1"
                name="sex"
              >
                <option value="1">Female</option>
                <option value="0">Male</option>
              </select>

              <label
                style={{ marginTop: "40px" }}
                className="col-2"
                htmlFor="bankBranchId"
              >
                <b>Ngân hàng: </b>
              </label>
              <select
                onChange={this.changeHandler}
                style={{ marginTop: "40px" }}
                className="col-8"
                name="bankBranchId"
              >
                <option value="1">
                  Ngân hàng Á Châu (ACB) - Chi nhánh Gò Vấp
                </option>
                <option value="2">
                  Ngân hàng Á Châu (ACB) - Chi nhánh quận 1
                </option>
                <option value="3">
                  Ngân hàng Á Châu (ACB) - Chi nhánh quận 2
                </option>
                <option value="4">
                  Ngân hàng Sacombank (SCB) - Chi nhánh Gò Vấp
                </option>
                <option value="5">
                  Ngân hàng Sacombank (SCB) - Chi nhánh quận 1
                </option>
                <option value="6">
                  Ngân hàng Sacombank (SCB) - Chi nhánh quận 2
                </option>
              </select>

              <button
                onClick={this.submitSignupHandler}
                className="btnSubmit"
                type="submit"
              >
                Signup
              </button>
              <label>
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
            <div
              className="container row"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              <button
                className="col-4"
                type="button"
                onClick={() =>
                  (document.getElementById("id02").style.display = "none")
                }
                className="cancelbtn"
              >
                Cancel
              </button>
              <span className="psw col-8">
                Forgot{" "}
                <a style={{ color: "black" }} href="#">
                  password?
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
