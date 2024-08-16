import { useCreateTree } from "@/hooks/useCreateTree";
import { locationsQuery, assetsQuery } from "@/query";
import { Company } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { TreeBranch } from "./TreeBranch";
import { Spinner } from "./Spinner";
import styles from "./TreeContainer.module.css";

import { useFindSearchPath } from "@/hooks/useFindSearchPath";
import { Search } from "./Search";
import { SearchFilter } from "./SearchFilter";
import { isComponent } from "@/utils";
import { useStore } from "@/state";

export const TreeContainer = ({ company }: { company: Company }) => {
  const searchQuery = useStore((state) => state.search);
  const activeFilters = useStore((state) => state.activeFilters);

  const { data: locations } = useQuery(locationsQuery(company.id));

  const { data: assets } = useQuery(assetsQuery(company.id));

  const { tree } = useCreateTree({ locations, assets });

  const { selectedItems } = useFindSearchPath({
    data: [...(locations ?? []), ...(assets ?? [])],
    searchQuery,
    activeFilters: activeFilters.map((f) => f.fn),
  });

  if (!tree) {
    return <Spinner />;
  }

  return (
    <aside className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <SearchFilter
          filter={{
            filterKey: "energy-sensors",
            fn: (item) => isComponent(item) && item.sensorType === "energy",
          }}
          text="Show only energy sensors"
        />
        <SearchFilter
          filter={{
            filterKey: "critical-status",
            fn: (item) => "status" in item && item.status === "alert",
          }}
          text="Show only critical status"
        />
      </div>

      <Search />

      <ul className={styles.treeList}>
        {tree.map((item) => (
          <TreeBranch
            key={item.id}
            item={item}
            selectedItems={selectedItems}
            searchActive={searchQuery !== ""}
          />
        ))}
      </ul>
    </aside>
  );
};
