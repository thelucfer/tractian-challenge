import { useCreateTree } from "@/hooks/useCreateTree";
import { locationsQuery, assetsQuery } from "@/query";
import { Company, TreeItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { TreeBranch } from "./TreeBranch";
import { Spinner } from "./Spinner";
import styles from "./TreeContainer.module.css";
import { useState } from "react";
import { useFindSearchPath } from "@/hooks/useFindSearchPath";

export const TreeContainer = ({ company }: { company: Company }) => {
  const [search, setSearch] = useState<string>("");
  const [filterByEnergySensors, setFilterByEnergySensors] =
    useState<boolean>(false);

  const [filterByCriticalStatus, setFilterByCriticalStatus] =
    useState<boolean>(false);

  const { data: locations } = useQuery({
    ...locationsQuery(company.id),
    initialData: [],
  });

  const { data: assets } = useQuery({
    ...assetsQuery(company.id),
    initialData: [],
  });

  const { tree } = useCreateTree({ locations: locations, assets: assets });

  const activeFilters = () => {
    const filters = [];

    if (filterByEnergySensors) {
      filters.push(
        (item: TreeItem) => "sensorType" in item && item.sensorType === "energy"
      );
    }

    if (filterByCriticalStatus) {
      filters.push(
        (item: TreeItem) => "status" in item && item.status === "alert"
      );
    }

    return filters;
  };

  const { selectedItems } = useFindSearchPath({
    data: [...locations, ...assets],
    searchQuery: search,
    activeFilters: activeFilters(),
  });

  if (!tree) {
    return <Spinner />;
  }

  return (
    <aside className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <label className={styles.filter}>
          <input
            type="checkbox"
            checked={filterByEnergySensors}
            onChange={() => setFilterByEnergySensors((prev) => !prev)}
          />
          show only energy sensors
        </label>
        <label className={styles.filter}>
          <input
            type="checkbox"
            checked={filterByCriticalStatus}
            onChange={() => setFilterByCriticalStatus((prev) => !prev)}
          />
          show only critical status
        </label>
      </div>
      <input
        className={styles.input}
        placeholder="Search asset or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className={styles.treeList}>
        {tree.map((item) => (
          <TreeBranch
            key={item.id}
            item={item}
            selectedItems={selectedItems}
            searchActive={search !== ""}
          />
        ))}
      </ul>
    </aside>
  );
};
