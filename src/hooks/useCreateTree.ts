import { Asset, Location, TreeItem } from "@/types";
import { useMemo } from "react";

type Item = {
  id: string;
  name: string;
  parentId: string | null;
  locationId?: string | null;
};

export const useCreateTree = ({
  locations: _locations,
  assets: _assets,
}: {
  locations: Location[];
  assets: Asset[];
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
    if (_locations.length === 0 || _assets.length === 0) {
      return null;
    }

    return assembleTree([..._locations, ..._assets]);
  }, [_locations, _assets]);

  return { tree } as const;
};
