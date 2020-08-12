import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          maxHeight: "300px",
          backgroundColor: "#bbe1fa",
          width: "100%",
          left: 0,
          bottom: 0,
        }}
      >
        <div className="container">
          <div className="copyright">
            © Copyright <strong>E-Banking</strong>. All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>
    );
  }
}
