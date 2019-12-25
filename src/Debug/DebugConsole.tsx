import * as React from "react";
import ReactDOM from "react-dom";
import { createDebugRuntime } from "../Factory/DebugRuntimeFactory";

class DebugConsole extends React.Component {
  private runtime: DebugRuntime;

  constructor(props) {
    super(props);
    this.runtime = createDebugRuntime();
    this.cmd = React.createRef();
  }

  handleSubmit(event: React.FormEventHandler<HTMLElement>) {
    event.preventDefault();

    const [method, ...args] = this.cmd.current.value.split(/\s/);
    const debugMethod = "__debug__" + method;

    if (!Object.hasOwnProperty.call(this.runtime.__proto__, debugMethod)) {
      throw new Error(`"${debugMethod}" not found in runtime`);
    }

    this.runtime[debugMethod].apply(this.runtime, args);
    this.cmd.current.value = "";
  }

  render() {
    return (
      <div className="debug-console">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input name="cmd" ref={this.cmd} />
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <DebugConsole />,
  document.getElementById("debug_console_root")
);
