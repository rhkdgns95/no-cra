import React from 'react';
import About from "./About";

describe("About 컴포넌트", () => {
  it("4개의 Component를 소유하고 있는지?", () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('*')).to.have.length(5);
  });
});