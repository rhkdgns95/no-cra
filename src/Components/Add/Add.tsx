import React, { useState, useEffect } from 'react';

interface IAddProps {
	name: string;
	title: string;
}

interface ICounterProps {
	setNumber: Function;
}

/* disable-eslint */
export const Increment = (num: number): number => num + 1;
export const Decrement = (num: number): number => num - 1;

export const useMounted = (initValue: boolean): { mount: boolean } => {
	const [mount, setMount] = useState<boolean>(initValue);

	useEffect(() => {
		setMount(!initValue);
	}, [initValue]);

	return {
		mount,
	};
};

export const useInput = (
	initValue: string
): {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} => {
	const [value, setValue] = useState<string>(initValue);

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const {
			target: { value: newValue },
		} = event;
		setValue(newValue);
	};

	return {
		value,
		onChange,
	};
};

const Add: React.FC<IAddProps> = ({ name, title }: IAddProps) => {
	const myName = useInput(name);
	const myTitle = useInput(title);
	const [number, setNumber] = useState<number>(0);
	return (
		<div>
			<h5>현재 값: {number}</h5>
			<p>{myName.value}</p>
			<p>{myTitle.value}</p>
			<Counter setNumber={setNumber} />
		</div>
	);
};

export const Counter: React.FC<ICounterProps> = ({
	setNumber,
}: ICounterProps) => {
	return (
		<div style={{ backgroundColor: 'gray' }}>
			<button
				type="button"
				onClick={(): Function =>
					setNumber((prevState: number) => Increment(prevState))
				}
			>
				증가
			</button>
			<button
				type="button"
				onClick={(): Function =>
					setNumber((prevState: number) => Decrement(prevState))
				}
			>
				감소
			</button>
		</div>
	);
};

export default Add;
