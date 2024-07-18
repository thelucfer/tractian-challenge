import { useCreateTree } from "@/hooks/useCreateTree";
import { locationsQuery, assetsQuery } from "@/query";
import { Company } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { TreeBranch } from "./TreeBranch";
import { Spinner } from "./Spinner";
import styles from "./TreeContainer.module.css";
import { useState, useDeferredValue } from "react";
import { useFindSearchPath } from "@/hooks/useFindSearchPath";

export const TreeContainer = ({ company }: { company: Company }) => {
  const [search, setSearch] = useState<string>("");

  const { data: locations } = useQuery({
    ...locationsQuery(company.id),
    initialData: [],
  });

  const { data: assets } = useQuery({
    ...assetsQuery(company.id),
    initialData: [],
  });

  const { tree } = useCreateTree({ locations: locations, assets: assets });

  const { selectedItems } = useFindSearchPath({
    data: [...locations, ...assets],
    searchQuery: search,
  });

  if (!tree) {
    return <Spinner />;
  }

  return (
    <aside className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Search asset or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className={styles.treeList}>
        {tree.map((item) => (
          <TreeBranch key={item.id} item={item} selectedItems={selectedItems} />
        ))}
      </ul>
    </aside>
  );
};
