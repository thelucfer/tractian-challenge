import { Asset, Location, Component, TreeItem } from "@/types";
import { useCallback, useMemo } from "react";

export const useFindSearchPath = ({
  data,
  searchQuery,
  activeFilters,
}: {
  searchQuery: string;
  data: Array<Location | Asset | Component>;
  activeFilters: Array<(item: TreeItem) => boolean>;
}) => {
  const matchingItems = () => {
    return data.filter((item) => {
      if (activeFilters.length === 0) {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      }

      return (
        activeFilters.every((filter) => filter(item as TreeItem)) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const getAllInPath = useCallback(
    (item: Location | Asset | Component, accumulator: Array<string>) => {
      if (!data) {
        return [];
      }

      const parent = (() => {
        if ("locationId" in item && item.locationId !== null) {
          return data.find((dataItem) => dataItem.id === item.locationId);
        }

        return data.find((dataItem) => dataItem.id === item.parentId);
      })();

      if (!parent) {
        return [...accumulator, item.id];
      }

      return getAllInPath(parent, [item.id, ...accumulator]);
    },
    [data]
  );

  const selectedItems = useMemo(() => {
    return matchingItems()
      .map((item) => getAllInPath(item, []))
      .flat();
  }, [matchingItems]);

  return { selectedItems } as const;
};
