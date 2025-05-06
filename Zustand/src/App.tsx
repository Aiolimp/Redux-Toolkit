import React, { useState, useEffect } from 'react';
import { useCounterStore } from './store/Counter'; // 导入计数器store
import { useTodoStore } from './store/Todo'; // 导入待办事项store
import { useUserStore } from './store/User'; // 导入待办事项store

const App: React.FC = () => {
  // 从计数器store解构需要的状态和方法
  const { count, increment, decrement, reset } = useCounterStore();

  // 从待办事项store解构需要的状态和方法
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  // 从用户store解构需要的状态和方法
  const { data, loading, error, fetchData } = useUserStore();
  // 通过getState()获取状态
  const getCountState = () => {
    console.log(useCounterStore.getState().count);
  };

  // 通过setState()修改状态
  const setCountState = () => {
    useCounterStore.setState({ count: 9 });
  };

  // 订阅整个 state 的变化，每次任意 state 更新，subscribe 都会调用回调函数。
  useCounterStore.subscribe((state) => {
    console.log('Count changed:', state.count);
  });

  // 订阅特定的 state 属性的变化，只有当 count 属性更新时，subscribe 才会调用回调函数。
  useCounterStore.subscribe(
    (state) => state.count,
    (newCount: number, oldCount: number) => {
      console.log('新值:', newCount);
      console.log('旧值:', oldCount);
    },
    {
      // equalityFn（默认使用 Object.is），用于判断值是否真的“变了”。如果返回 true，认为没变，不会触发监听回调。
      equalityFn: (a, b) => {
        // 当旧值是偶数、但新值是非偶数时，返回 false，允许触发，其他情况都返回 true，不触发
        return !(b % 2 === 0 && a % 2 !== 0);
      },
      // 订阅创建时立即执行一次 listenerFn，不管 state 有没有发生变化。
      // 这在组件初始化时获取某个状态值的“副作用处理”特别有用（例如首次渲染后上报一次当前值）。
      // fireImmediately: true,
    }
  );

  // 本地状态管理新增待办事项的标题
  const [title, setTitle] = useState('');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* 计数器部分 */}
      <h1>Zustand Counter</h1>
      <h2>{count}</h2>
      <div>
        <button onClick={increment}>➕ Increment</button>
        <button onClick={decrement}>➖ Decrement</button>
        <button onClick={reset}>🔄 Reset</button>
        <button onClick={getCountState}>获取当前count</button>
        <button onClick={setCountState}>修改当前count为9</button>
      </div>

      {/* 待办事项部分 */}
      <h2>Todo List</h2>
      {/* 输入框用于添加新待办事项 */}
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="添加一个事项" />
      {/* 添加按钮 - 调用addTodo并清空输入框 */}
      <button
        onClick={() => {
          addTodo(title);
          setTitle('');
        }}
      >
        添加事项
      </button>

      {/* 待办事项列表 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* 点击切换完成状态 */}
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {todo.title}
            </span>
            {/* 删除按钮 */}
            <button onClick={() => removeTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <h1>Zustand 异步请求示例</h1>
        <button onClick={fetchData} disabled={loading}>
          {loading ? '加载中...' : '获取数据'}
        </button>

        {data && <p>✅ 数据：{data}</p>}
        {error && <p style={{ color: 'red' }}>❌ 错误：{error}</p>}
      </div>
    </div>
  );
};

export default App;
