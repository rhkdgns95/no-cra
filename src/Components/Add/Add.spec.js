import React, { useState } from 'react';
import Add, { Increment, Decrement, Counter } from './Add';
import Axios from 'axios';
/**
 *  테스트 묶음(suite)은 두 개의 테스트를 가지고 있음.
 *  describe라고하는 블록은 테스트 묶음을 정의하고, it이라는 블록은 테스트 케이스를 정의함.
 *
 *  describe: 테스트 묶음을 정의.
 *  it: 테스트 케이스를 정의.
 *
 *  테스트는 성공할 수 있고(Green),
 *  실패할 수 도 있다(Red)
 *
 *  it블록에 테스트 작성시 보통 다음 3단계를 거침
 *  1. 값을 정의(arrange)
 *  2. 실행(act)
 *  3. 단언(assert)
 */
describe('Local State', () => {
	it('state의 counter를 하나 올릴 수 있음.', () => {
		const value = 0; // 초기 상태를 정의
		const increasedNumber = Increment(value); // 테스트 할 함수 실행
		expect(increasedNumber).to.equal(1); // 우리가 설정한 기대값과 일치하는지 단언함.
	});
	it('state의 counter를 하나 줄일 수 있음.', () => {
		const value = 0;
		const decreasedNumber = Decrement(value);

		expect(decreasedNumber).to.equal(-1);
	}); // nyc codecoverage
});

describe('Add Component', () => {
	// Add 컴포넌트에서 Counter컴포넌트가 하나만 렌더링이 되는지 테스트.
	context('First Context', () => {

	});
	it('컴포넌트 Add안에서 컴포넌트 Counter가 렌더링 한다.', () => {
		const wrapper = shallow(<Add />); // Add
		expect(wrapper.find(Counter)).to.have.length(1);
	});

	// it("List래퍼가 list엘리먼트를 렌더링 한다", () => {
	//   const wrapper = shallow(<List items={['a', 'b']} />);
	//   ex
	// });
});

// const HookWrapper = (props) => {
// 	const hook = props.hook ? props.hook() : undefined;
// 	return <div hook={hook}/>;
// };

// describe("Add Component", () => {
// 	it("Add Component", () => {
// 		const wrapper = shallow(<HookWrapper hook={() => <Add />}/>);
// 		const { hook } = wrapper.find('div').props();
// 		const { name, title } = hook;
// 		expect(name).to.equal(undefined);
// 		expect(title).to.equal(undefined);
// 	});
// });

const useStateFunc = (initValue) => {
	const [value, setValue] = useState(initValue);
	return {
		value,
		setValue
	};
}
const MyApp = () => {
	return (
		<div>
			<MyTitle />
			<div className="group hello">
				hello
			</div>
			<div className="group bye">
				bye
			</div>
		</div>
	)
};
/*
 *  Add컴포넌트의 하위컴포넌트에서 변경되는 값을 테스팅 해보기.
 */
describe("Add Component", () => {
	context("이벤트 - Button Click", () => {

		let addWrapper;
		let header;
		let btns, btnIncrement, btnDecrement;
		before("exist", () => {
			addWrapper = mount(<Add />);
			header = addWrapper.find('h5');
			btns = addWrapper.find('button');
			btnIncrement = btns.first();   // .at(0)
			btnDecrement = btns.last();    // /at(1) 과 같다.
		});

		it("Exist", () => {
			expect(addWrapper).to.exist;
			expect(header).to.exist;
			expect(btns).to.have.length(2);
			expect(btnIncrement).to.exist;
			expect(btnDecrement).to.exist;
		});

		it("Increament", () => {
			expect(header.text()).to.equal("현재 값: 0");  
			// 3증가, result => 3
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 3");

			// 6증가, result => 9
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 9");
		});

		it("Decrement", () => {
			// 2 감소, result => 7
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 7");

			// 4 감소, result => 3
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 3");
		});

	});
});

/**
 *  비동기 처리 테스팅
 */
const url = "https://jsonplaceholder.typicode.com/todos/1";

const valid = {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
};

describe("asynchronized", () => {
	
	it("async test case 1", () => {
		Axios.get(url).then(response => {
			const { data } = response;
			expect(data).to.eql(valid);
			// console.log("DATA: ", data);
		});
	});
});