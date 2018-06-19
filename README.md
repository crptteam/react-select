# react-select

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

SingleSelect and MultiSelect React components.

## Usage

```javascript

import { SingleSelect, MultiSelect } from "@crpt/react-select";

<SingleSelect onSelect={val => console.log(vaL)} values={[{id:1, title: "Left"}, {id:2, title: "Right"]} />
```

### SingleSelect

| PropName | Description | Example |
|---|---|---|
| values: Array (Required)  | Values. |  `<SingleSelect values=[{id:1, title: "value 1"}, {id: 2, title: "value 2"}]  />` |
| disabled: Boolean  | Can be disabled. |  `<SingleSelect disabled  />` |
| onSelect: Function  | Callback for select event. |  `<SingleSelect onSelect={val => console.log(val)}  />` |
| placeholder: String  | Placeholder value. |  `<SingleSelect placeholder="Some placeholder"  />` |
| selectedId: Integer  | If passed, child with id = selectedId becomes selected. |  `<SingleSelect values=[{id:1, title: "value 1"}, {id: 2, title: "value 2"}] selectedId={2}  />` |
| truncate: Boolean | Long text truncation. Select options width will not exceed input width.  | `<SingleSelect truncate values=[{id:1, title: "very looong text"}] />` |
| multiline: Boolean | Long text wrap. | `<SingleSelect multiline values=[{id:1, title: "very looong text"}] />` |


### MultiSelect

| PropName | Description | Example |
|---|---|---|
| values: Array (Required)  | Values. |  `<MultiSelect values=[{id:1, title: "value 1"}, {id: 2, title: "value 2"}]  />` |
| disabled: Boolean  | Can be disabled. |  `<MultiSelect disabled  />` |
| onSelect: Function  | Callback for select event. |  `<MultiSelect onSelect={val => console.log(val)}  />` |
| placeholder: String  | Placeholder value. |  `<MultiSelect placeholder="Some placeholder"  />` |
| selectedIds: Array  | If passed, childs with id in selectedIds becomes selected. |  `<MultiSelect values=[{id:1, title: "value 1"}, {id: 2, title: "value 2"}] selectedIds={[1,2]}  />` |
| truncate: Boolean | Long text truncation. Select options width will not exceed input width.  | `<MultiSelect truncate values=[{id:1, title: "very looong text"}] />` |
| multiline: Boolean | Long text wrap. | `<MultiSelect multiline values=[{id:1, title: "very looong text"}] />` |


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
