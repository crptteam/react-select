# Select

Компонент селекта.
Может работать в одиночном режиме и в режиме мульти-селекта.

## Usage

```javascript

import { Select } from "components/lib";

<Select onSelect={val => console.log(vaL)} values={[{id:1, title: "Left"}, {id:2, title: "Right", selected: true}]} />

```
| PropName | Описание | Пример |
|---|---|---|
| values: Array (Required)  | Список значений для выбора формата {id:number, title:string, selected:boolean}.<br/>Если selected=true, то соответствующий элемент или элементы выставляются в качестве выбранных.  |  `<Select values=[{id:1, title: "elem", selected: true}]  />` |
| disabled: Boolean  | Если равно true, то Select выключен. |  `<Select disabled  />` |
| onSelect: Function  | Callback выбора или обновления выбора.<br/>Получает аргументом объект либо массиво объектов. |  `<Select onSelect={val => console.log(vaL)}  />` |
| placeholder: String  | Значение placeholder. |  `<Select placeholder="Категории"  />` |
| multi: Boolean  | Если равно true, то Select работает в режиме выбора многих вариантов. |  `<Select multi />` |
