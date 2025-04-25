import { create } from 'zustand';

type LoadingState = {
  routeLoading: boolean;
  apiLoading: boolean;
  setRouteLoading: (loading: boolean) => void;
  setApiLoading: (loading: boolean) => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  routeLoading: false,
  apiLoading: false,
  setRouteLoading: (loading) => set({ routeLoading: loading }),
  setApiLoading: (loading) => set({ apiLoading: loading }),
}));