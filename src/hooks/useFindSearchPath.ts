import { Asset, Location, Component } from "@/types";
import { useCallback, useEffect, useMemo } from "react";

export const useFindSearchPath = ({
  data,
  searchQuery,
}: {
  searchQuery: string;
  data: Array<Location | Asset | Component>;
}) => {
  const matchingItems = data.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
    return matchingItems.map((item) => getAllInPath(item, [])).flat();
  }, [matchingItems]);

  return { selectedItems } as const;
};
