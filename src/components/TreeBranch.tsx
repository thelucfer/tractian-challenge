import { TreeItem } from "@/types";
import { TreeItemIcon } from "./TreeItemIcon";
import styles from "./TreeBranch.module.css";

export const TreeBranch = ({
  item,
  level = 0,
}: {
  item: TreeItem;
  level?: number;
}) => {
  return (
    <div style={{ marginLeft: `${level * 0.5}rem` }}>
      <div className={styles.pill}>
        <TreeItemIcon item={item} />
        {item.name}
      </div>

      {item.children?.map((child) => (
        <TreeBranch key={child.id} item={child} level={level + 1} />
      ))}
    </div>
  );
};
