import React from "react";
import { SingleSelect } from "../src/";
import { shallow, mount } from 'enzyme';

describe('SingleSelect render', () => {
  it('should renders without problems', () => {
    const wrapper = mount(<SingleSelect />);
    expect(wrapper).toMatchSnapshot();
  });
});


describe('SingleSelect selector', () => {
  const values = [
    { id: 0, title: '0' },
    { id: 1, title: '1' },
    { id: 100, title: '100' },
  ];

  it('selected selectedId=0 and value="0" when selectedId={0}', () => {
    const component = shallow(
      <SingleSelect
        values={values}
        selectedId={0}
      />,
    ).first().shallow();
    expect(component.state().selectedId).toBe(0);
    expect(component.state().value).toBe('0');
  });

  it('selected selectedId=100 and value="100" when selectedId={100}', () => {
    const component = shallow(
      <SingleSelect
        values={values}
        selectedId={100}
      />,
    ).first().shallow();
    expect(component.state().selectedId).toBe(100);
    expect(component.state().value).toBe('100');
  });

  it('selected selectedId=null and value="" when selectedId={30}', () => {
    const component = shallow(
      <SingleSelect
        values={values}
        selectedId={30}
      />,
    ).first().shallow();
    expect(component.state().selectedId).toBeNull();
    expect(component.state().value).toBe('');
  });

  it('selected selectedId=null and value="" when selectedId={null}', () => {
    const component = shallow(
      <SingleSelect
        values={values}
        selectedId={null}
      />,
    ).first().shallow();
    expect(component.state().selectedId).toBeNull();
    expect(component.state().value).toBe('');
  });

  it('selected selectedId=null and value="" when selectedId={NaN}', () => {
    const component = shallow(
      <SingleSelect
        values={values}
        selectedId={NaN}
      />,
    ).first().shallow();
    expect(component.state().selectedId).toBeNull();
    expect(component.state().value).toBe('');
  });

  it('selected selectedId=null and value="" when selectedId is string', () => {
    const component = shallow(
      <SingleSelect
        values={values}
        selectedId="0"
      />,
    ).first().shallow();
    expect(component.state().selectedId).toBeNull();
    expect(component.state().value).toBe('');
  });

});
