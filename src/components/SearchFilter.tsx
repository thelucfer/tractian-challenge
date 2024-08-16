import { useStore } from "@/state";
import styles from "./SearchFilter.module.css";
import { ActiveFilters } from "@/types";

export const SearchFilter = ({ filter }: { filter: ActiveFilters[number] }) => {
  const activeFilters = useStore((state) => state.activeFilters);
  const setActiveFilters = useStore((state) => state.setActiveFilters);

  const toggleActiveFilter = () => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter);
      }

      return [...prev, filter];
    });
  };

  return (
    <label className={styles.filter}>
      <input
        type="checkbox"
        checked={!!activeFilters.find((f) => f === filter)}
        onChange={toggleActiveFilter}
      />
      show only energy sensors
    </label>
  );
};
