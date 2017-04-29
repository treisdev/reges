import React, { Component } from "react";
import "./app.css";

class App extends Component {
  state = { regex: "", parameter: "", test: "" };
  handleChange(field) {
    return event =>
      this.setState({
        [field]: event.target.value
      });
  }
  tryRegex() {
    try {
      return new RegExp(this.state.regex, this.state.parameter);
    } catch (err) {
      return null;
    }
  }
  parseResult() {
    const regex = this.tryRegex();
    return regex
      ? this.state.test.replace(
          regex,
          str => `<strong><em>${str}</em></strong>`
        )
      : "";
  }
  parseRegex() {
    const regex = this.tryRegex();
    return regex ? JSON.stringify(this.state.test.match(regex)) : "";
  }
  render() {
    return (
      <div className="container">
        <div className="group fixed">
          <label htmlFor="input-regex">Your regex</label>
          <div className="regex-inputs">
            /
            <input
              type="text"
              placeholder="a-zA-z0-9"
              value={this.state.regex}
              onChange={this.handleChange("regex")}
              id="input-regex"
            />
            /
            <input
              type="text"
              placeholder="ig"
              value={this.state.parameter}
              onChange={this.handleChange("parameter")}
              id="input-parameter"
            />
          </div>
        </div>
        <div className="group">
          <label htmlFor="input-test-string">Your test string</label>
          <textarea
            id="input-test-string"
            onChange={this.handleChange("test")}
            value={this.state.test}
          />
        </div>
        <div className="group">
          <label htmlFor="output">Output</label>
          <div>
            {this.parseRegex()}
            <div dangerouslySetInnerHTML={{ __html: this.parseResult() }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
