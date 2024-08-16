import { useStore } from "@/state";
import styles from "./Search.module.css";

export const Search = () => {
  const search = useStore((state) => state.search);
  const setSearch = useStore((state) => state.setSearch);

  return (
    <input
      className={styles.input}
      placeholder="Search asset or location"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
