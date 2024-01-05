import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from "@/redux/features/counterSlice";

const Counter = () => {
  const router = useRouter();
  const { value } = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  const [text, setText] = useState(0);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByPayload = () => {
    dispatch(incrementByAmount(Number(text)));
  };

  const handleAsyncIncrement = () => {
    dispatch(incrementAsync(Number(text)));
  };
  return (
    <>
      <button onClick={() => router.push("/")}>Home</button>
      <div>
        <h1>Counter: {value}</h1>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <input
          type="number"
          name=""
          id=""
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleIncrementByPayload}>Add</button>
        <button onClick={handleAsyncIncrement}>Add Amount in Async</button>
      </div>
    </>
  );
};

export default Counter;
