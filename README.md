# react-select

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

SingleSelect and MultiSelect React components.

## Install ##
```javascript
npm i --save @crpt/react-select
```

## Usage

```javascript

import { SingleSelect, MultiSelect } from "@crpt/react-select";

<SingleSelect onSelect={val => console.log(vaL)} values={[{id:1, title: "Left"}, {id:2, title: "Right"]} />
```

### SingleSelect

| PropName | Description | Example |
|---|---|---|
| values: Array (Required)  | Values. See Note1 |  `<SingleSelect values=[{id:1, title: "value 1"}, {id: 2, title: "value 2"}]  />` |
| disabled: Boolean  | Can be disabled. |  `<SingleSelect disabled  />` |
| onSelect: Function  | Callback for select event. |  `<SingleSelect onSelect={val => console.log(val)}  />` |
| onChange: Function | Callback for change event | |
| placeholder: String  | Placeholder value. |  `<SingleSelect placeholder="Some placeholder"  />` |
| savePlaceholder: Boolean | When true, placeholder's text is placed on top if any of value is selected and in the center otherwise | |
| selectedId: Integer  | If passed, child with id = selectedId becomes selected. |  `<SingleSelect values=[{id:1, title: "value 1"}, {id: 2, title: "value 2"}] selectedId={2}  />` |
| truncate: Boolean | Long text truncation. Select options width will not exceed input width.  | `<SingleSelect truncate values=[{id:1, title: "very looong text"}] />` |
| multiline: Boolean | Long text wrap. | `<SingleSelect multiline values=[{id:1, title: "very looong text"}] />` |
| isLoading: Boolean | If true, there is "Загрузка..." displayed on drop list | |
| renderValue: React element or function | It is a function for rendering title to inputText. | See note 2.|
| renderOption: React element or function | It is rendered instead of all of titles in values (working with renderValue) | |
| onRef | Return {this of SingleSelect} in componentDidMount and undefined in componentWillUnmount| | |
| hideOptionsPanel: Boolean | If true optionList isn't shown | | |
| withoutIcon: Boolean | Seach and BottomArrow Icons are not shown when properties is true | | |
| filterDisabled: Boolean | When you are writing in text field, option list is filtered using typing text. If filterDisabled is true optionList isn't filtered | | |
| iconPosition: String | Icon position. Default: 'right' | | |
| showPointer: Boolean | Show options panel dialog pointer. Default: false | | |

__Note1__. Values is array of objects. You can add any properties and then use renderValue or renderOption for render them. But some properties are special.

| Property name | Property type | Property description |
|---|---|---|
| id (required) | Number | Must be unique integer |
| value (required) | String or element| Value is returned on onSelect |
| title (required) | String or element | Title is shown on the text field after the select |
| titleText | String or element | Title for textField. If undefined title field is displayed | 
| titleOption | String or element | Title for optionList. If undefined title field is displayed |
| filterString | String | If defined filter process use this properties instead of title |


Examples of title:
- simple title:
```javscript
title: 'empty'
```

- object title:
```javscript
title: (
  <div>
    Title <b>text</b> here
  </div>)
```

__Note 2__ 
RenderOption. _Values_ item properties are passed to function using _value_ propertie. Renders function example: 
RenderValue. _Values_ item properties are passed to function using _selected_ and _value_ (it's the same) property. Renders function example: 
```javascript
const renderOption = (props) => (
  <div>
    To option field:<br/>
    <b>{props.value.prop1}</b><br/>
    <i>{props.value.prop2}</i>
  </div>
);
```

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
| iconPosition: String | Icon position. Default: 'right' | | |
| showPointer: Boolean | Show options panel dialog pointer. Default: false | | |


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
