import React, { Component } from "react";
import { render } from "react-dom";

import {SingleSelect} from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-select Demo</h1>
        <SingleSelect
          onChange={val => console.log('val', val)}
          width={'100%'}
          values={[{ id: 0, title: "tralala" }, { id: 1, title: "trulala" }]}
          isLoading={true}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
