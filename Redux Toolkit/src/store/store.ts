// 从Redux Toolkit导入configureStore函数
import { configureStore } from '@reduxjs/toolkit';
// 导入counterSlice导出的reducer函数
import counterReducer from './counterSlice.ts';

// 创建并导出Redux store实例
export const store = configureStore({
  // 配置reducers对象，可以包含多个slice reducer
  reducer: {
    // 将counterReducer绑定到store的counter属性
    // 这意味着可以通过state.counter访问该切片的状态
    counter: counterReducer,
  },
});
// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
