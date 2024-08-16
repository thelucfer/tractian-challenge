import { ActiveFilters, TreeItem } from "@/types";
import { create } from "zustand";

type Store = {
  activeFilters: Array<(item: TreeItem) => boolean>;
  setActiveFilters: (
    callback: (filters: ActiveFilters) => ActiveFilters
  ) => void;

  search: string;
  setSearch: (search: string) => void;
};

export const useStore = create<Store>((set) => ({
  activeFilters: [],
  setActiveFilters: (callback) =>
    set(({ activeFilters }) => ({
      activeFilters: callback(activeFilters),
    })),

  search: "",
  setSearch: (search) => set({ search }),
}));
