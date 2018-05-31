import React from "react";
import { SingleSelect } from "../src/";
import { mount } from 'enzyme';

describe("SingleSelect", () => {
  it("Should renders without problems", () => {
    const wrapper = mount(<SingleSelect />);

    expect(wrapper).toMatchSnapshot();
  });
});
