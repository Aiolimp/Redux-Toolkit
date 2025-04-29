import { useAppSelector, useAppDispatch } from '../store/hooks.ts';
import { decrement, increment, incrementByAmount } from '../store/counterSlice';

const counter = () => {
  // 使用useAppSelector从Redux store获取counter状态值
  // state.counter.value对应store中counter切片的值
  const count = useAppSelector((state) => state.counter.value);
  // 获取dispatch函数用于派发action
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>加一</button>
      <button onClick={() => dispatch(decrement())}>减一</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>累加</button>
    </div>
  );
};

export default counter;
