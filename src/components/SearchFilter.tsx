import { useStore } from "@/state";
import styles from "./SearchFilter.module.css";
import { ActiveFilters } from "@/types";

export const SearchFilter = ({
  filter,
  text,
}: {
  filter: ActiveFilters[number];
  text: string;
}) => {
  const activeFilters = useStore((state) => state.activeFilters);
  const setActiveFilters = useStore((state) => state.setActiveFilters);

  const toggleActiveFilter = () => {
    setActiveFilters((prev) => {
      if (prev.find((f) => f.filterKey === filter.filterKey)) {
        return prev.filter((f) => f.filterKey !== filter.filterKey);
      }

      return [...prev, filter];
    });
  };

  return (
    <label className={styles.filter}>
      <input
        type="checkbox"
        checked={!!activeFilters.find((f) => f.filterKey === filter.filterKey)}
        onChange={toggleActiveFilter}
      />
      {text}
    </label>
  );
};
