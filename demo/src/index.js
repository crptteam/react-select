import React, { Component } from "react";
import { render } from "react-dom";

import Example from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-select Demo</h1>
        <Example
          width={'100%'}
          values={[{ id: 0, title: "tralala" }, { id: 1, title: "trulala" }]}
          renderValue={props => <div {...props}>{props.selected && props.selected.title + '1'}</div>}
          renderOption={props => <div {...props}><div>1</div><div>{props.value && props.value.title + '  1'}</div></div>}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
