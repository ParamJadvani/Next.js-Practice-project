import { create } from "zustand";

interface User {
    id: string;
    email: string;
}

interface AuthStore {
    isLogin: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    initialize: (authState: { isLogin: boolean; user: User | null }) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isLogin: false,
    user: null,
    login: (user) => set({ isLogin: true, user }),
    logout: () => set({ isLogin: false, user: null }),
    initialize: (authState) => set(authState),
}));

export default useAuthStore;
