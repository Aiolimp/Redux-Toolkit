import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// 使用 subscribeWithSelector 中间件创建 Zustand store
export const useCounterStore = create<CounterState>()(
  subscribeWithSelector((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
  }))
);

// export const useCounterStore = create<CounterState>((set) => ({
//   // set 是 Zustand 提供的修改函数，用于更新状态
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
// }));
