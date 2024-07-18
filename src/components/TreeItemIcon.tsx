import { TreeItem } from "@/types";
import componentIcon from "@/assets/component.png";
import locationIcon from "@/assets/location.png";
import assetIcon from "@/assets/asset.png";
import { isAsset, isLocation } from "@/utils";

export const TreeItemIcon = ({ item }: { item: TreeItem }) => {
  if (isLocation(item)) {
    return <img src={locationIcon} alt="location icon" />;
  }

  if (isAsset(item)) {
    return <img src={assetIcon} alt="asset icon" />;
  }

  return <img src={componentIcon} alt="component icon" />;
};
