import { create } from "zustand";

export interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  count: number;
  increment: () => void;
  decrement: () => void;
  resetCount: () => void;
  bannerDismissed: boolean;
  dismissBanner: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
  resetCount: () => set({ count: 0 }),
  bannerDismissed: false,
  dismissBanner: () => set({ bannerDismissed: true }),
}));
