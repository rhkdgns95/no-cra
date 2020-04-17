import React, { useState } from 'react';

export const Increment = (number: number) => number + 1;
export const Decrement = (number: number) => number - 1;

const Add = () => {
  const [number, setNumber] = useState<number>(0);

  return (
    <div>
      <h5>현재 값: { number }</h5>
      <Counter setNumber={setNumber} />
    </div>
  );
}

export const Counter = ({
  setNumber
}: any) => (
  <div>
  <button onClick={() => setNumber((prevState: number) => Increment(prevState))}>
    증가
  </button>
  <button onClick={() => setNumber((prevState: number) => Decrement(prevState))}>
    감소
  </button>
  </div>
)

export default Add;