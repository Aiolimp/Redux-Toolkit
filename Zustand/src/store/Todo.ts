import { create } from 'zustand';

// 定义单个Todo项的接口
interface Todo {
  id: number; // 唯一标识符
  title: string; // 待办事项标题
  completed: boolean; // 完成状态
}

// 定义Todo状态管理的接口
interface TodoState {
  todos: Todo[]; // Todo列表
  addTodo: (title: string) => void; // 添加Todo方法
  toggleTodo: (id: number) => void; // 切换完成状态方法
  removeTodo: (id: number) => void; // 删除Todo方法
}

// 创建并导出Todo状态管理store
export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [], // 初始化为空数组

  // 添加新的Todo项
  addTodo: (title) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(), // 使用时间戳作为ID
          title,
          completed: false, // 默认未完成
        },
      ],
    }));
    console.log(get().todos);
  },

  // 切换指定Todo项的完成状态
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // 反转完成状态
          : todo
      ),
    })),

  // 删除指定Todo项
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id), // 过滤掉指定ID的项
    })),
}));
