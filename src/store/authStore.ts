// --- Zustand Stores ---
// /store/authStore.ts

import { UserType } from '@/Types';
import { create } from "zustand";

interface AuthState {
    isLogin: boolean;
    user: UserType | null;
}

interface AuthActions {
    login: (user: UserType) => void;
    logout: () => void;
    initialize: (authState: AuthState) => void;
    updateUser: (user: Partial<UserType>) => void; 
}


const useAuthStore = create<AuthState & AuthActions>((set) => ({

    isLogin: false,
    user: null,


    login: (user) => set({ isLogin: true, user }),
    logout: () => set({ isLogin: false, user: null }),
    initialize: (authState) => set(authState),
    updateUser: (userData) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null,
        })),
}));

export default useAuthStore;
