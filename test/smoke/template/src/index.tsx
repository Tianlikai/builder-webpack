import React from "react";
import { createRoot } from "react-dom/client";
import * as style from "./index.module.scss";
import Element from "./document/Element";
import { square } from "./util";

class App extends React.PureComponent<{}> {
  handleClick = async () => {
    try {
      const pkg = await import(
        /* webpackChunkName: "lazyImport" */ "./lazyImport"
      );
      pkg.default();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const ret = square(2);
    const element = new Element("TLK");
    return (
      <div className={style.app}>
        hello world! {element.name}
        <div onClick={this.handleClick}>{ret}</div>
      </div>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
