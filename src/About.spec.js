import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { before, beforeEach } from 'mocha';
import About from './About';
import Add, { useInput, useMounted } from './Components/Add/Add';

function HookWrapper(props) {
	const hook = props.hook ? props.hook() : undefined;
	return <div hook={hook} />;
}

describe('Hooks - useInput', () => {
	// 테스트 묶음
	it('useInput 존재', () => {
		// 테스트 케이스
		const wrapper = shallow(<HookWrapper />);
		expect(wrapper).to.exist;
	});

	it("입력: ''", () => {
		const wrapper = shallow(<HookWrapper hook={() => useInput('')} />);
		const { hook } = wrapper.find('div').props();
		// console.log("hook: ", hook);
		const { value } = hook;
		expect(value).to.equal('');

		// console.log("VALUE: ", value);
	});

	it("입력: 'first name'", () => {
		const wrapper = shallow(<HookWrapper hook={() => useInput('first name')} />);
		const { hook } = wrapper.find('div').props();
		const { value } = hook;
		expect(value).to.equal('first name');

		// console.log("VALUE2: ", value);
	});
});

describe('About.tsx', () => {
	const wrapper = shallow(<About />);

	it('exist', () => {
		const wrapper = shallow(<HookWrapper hook={() => <About />} />);
		expect(wrapper).to.exist;
	});

	it('렌더링되는 컴포넌트의 수: 5', () => {
		expect(wrapper.find('*')).to.have.length(5);
	});

	it('렌더링 되는 엘리먼트 p의 수: 2', () => {
		expect(wrapper.find('p')).to.have.length(2);
	});
	it('컴포넌트 Add가 렌더링 된다.', () => {
		expect(wrapper.find(Add)).to.have.length(1);
	});
	it('모든 Props가 전달되었다.', () => {
		const addWrapper = shallow(<HookWrapper hook={() => <Add name="This is prime time" title="ok" />} />);
		const { hook } = addWrapper.find('div').props();
		const { name, title } = hook.props;

		// console.log("props: ", hook);
		// console.log("Name, title: ", name, title);
		expect(name).to.equal('This is prime time');
		expect(title).to.equal('ok');
	});
});

function useInputTest(hook, initValue) {
	return <HookWrapper hook={() => hook(initValue)} />;
}

describe('Hooks State', () => {
	it('exist', () => {
		const wrapper = shallow(<HookWrapper hook={() => useMounted(false)} />);
		expect(wrapper).to.exist;
	});

	it('normal', () => {
		const wrapper = shallow(<HookWrapper hook={() => useMounted(false)} />);
		const { hook } = wrapper.find('div').props();
		const { mount } = hook;
		expect(mount).to.equal(false);
	});

	// before 체크하기.
	before(() => {
		const wrapper = shallow(<HookWrapper hook={() => useMounted(true)} />);
		const { hook } = wrapper.find('div').props();
		const { mount } = hook;
		expect(mount).to.equal(true);
	});
	// fater 체크하기.
});

const App = () => <h1>Hello World</h1>;

let rootContainer;

describe('App Component Testing', () => {
	beforeEach(() => {
		rootContainer = document.createElement('div');
		document.body.appendChild(rootContainer);
	});
	afterEach(() => {
		document.body.removeChild(rootContainer);
		rootContainer = null;
	});
	it('Renders Hello World Title', () => {
		act(() => {
			ReactDOM.render(<App />, rootContainer);
		});
		const h1 = rootContainer.querySelector('h1');
		expect(h1.textContent).to.equal('Hello World');
	});
});
