import { TreeItem } from "@/types";
import styles from "./TreeBranchPill.module.css";
import { TreeItemIcon } from "./TreeItemIcon";
import { Chevron } from "./Chrevon";

export const TreeBranchPill = ({
  item,
  onClick,
}: {
  item: TreeItem;
  onClick?: () => void;
}) => {
  return (
    <button className={styles.pill} onClick={onClick}>
      {item?.children?.length > 0 && <Chevron />}
      <TreeItemIcon item={item} />
      {item.name}
    </button>
  );
};
