import { UserType } from "@/Types";
import { create } from "zustand";

interface AuthStore {
    isLogin: boolean;
    user: UserType | null;
    login: (user: UserType) => void;
    logout: () => void;
    initialize: (authState: { isLogin: boolean; user: UserType | null }) => void;
    updateUser: (user: UserType) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isLogin: false,
    user: null,
    login: (user) => set({ isLogin: true, user }),
    logout: () => set({ isLogin: false, user: null }),
    initialize: (authState) => set(authState),
    updateUser: (user) => set({ user }),
}));

export default useAuthStore;
