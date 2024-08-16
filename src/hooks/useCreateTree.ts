import { Asset, Location, TreeItem } from "@/types";
import { useMemo } from "react";

type Item = {
  id: string;
  name: string;
  parentId: string | null;
  locationId?: string | null;
};

export const useCreateTree = ({
  locations = [],
  assets = [],
}: {
  locations: Location[] | undefined;
  assets: Asset[] | undefined;
}) => {
  const assembleTree = (items: Array<Item>): TreeItem[] => {
    const topLevelItems = items.filter(
      (item) =>
        (item.parentId === null && !item?.locationId) ||
        item.locationId === null
    );

    const getChildren = (parentId: string, items: Item[]): TreeItem[] => {
      return items
        .filter(
          (item) => item.parentId === parentId || item.locationId === parentId
        )
        .map((item) => {
          return {
            ...item,
            children: getChildren(item.id, items),
          };
        });
    };

    return topLevelItems.map((item) => ({
      ...item,
      children: getChildren(item.id, items),
    }));
  };

  const tree = useMemo(() => {
    if (locations.length === 0 || assets.length === 0) {
      return null;
    }

    return assembleTree([...locations, ...assets]);
  }, [locations, assets]);

  return { tree } as const;
};
