import { TreeItem } from "@/types";
import styles from "./TreeBranchPill.module.css";
import { TreeItemIcon } from "./TreeItemIcon";
import { Chevron } from "./Chrevon";
import { clsx } from "clsx";
import { isAsset, isComponent } from "@/utils";

export const TreeBranchPill = ({
  item,
  onClick,
}: {
  item: TreeItem;
  onClick?: () => void;
}) => {
  const isCritical =
    (isComponent(item) || isAsset(item)) && item.status === "alert";

  const isEnergySensor = isComponent(item) && item.sensorType === "energy";

  return (
    <button
      className={clsx({
        [styles.pill]: true,
        [styles.critical]: isCritical,
        [styles.energy]: isEnergySensor,
      })}
      onClick={onClick}
    >
      {item?.children?.length > 0 && <Chevron />}
      <TreeItemIcon item={item} />
      {item.name}
    </button>
  );
};
