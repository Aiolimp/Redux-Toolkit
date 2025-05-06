import { create } from 'zustand';

interface UserState {
  data: string | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });

    try {
      // 模拟异步请求（如：fetch('https://api.example.com/user')）
      const response = await new Promise<string>((resolve) =>
        setTimeout(() => resolve('我是来自服务器的数据！'), 1500)
      );

      set({ data: response, loading: false });
    } catch (e) {
      set({ error: '请求失败', loading: false });
    }
  },
}));
