import React, { Component } from "react";

export default class ModalEditRate extends Component {
  constructor(props) {
    super(props);
    let { Id,rate, Term } = props.rate;

    this.state = {
      id:Id,
      rate: rate,
      term: Term,
    };
  }
  closeModal = () => {
    this.setState({
      id:null,
      rete: "",
      term: "",
    });
    this.props.onToggleModal();
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
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
    const { id,term, rate } = this.state;
  

    return (
      <div>
        <div className="modal-profile">
          <div className="profile">
            <h3>{id!==null?"Edit":"Add"} Rate</h3>
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
                {id?"UPDATE":"ADD"}
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
