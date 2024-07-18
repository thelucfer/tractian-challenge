import { TreeItem } from "@/types";
import styles from "./TreeBranch.module.css";
import { useState } from "react";
import { TreeBranchPill } from "./TreeBranchPill";

export const TreeBranch = ({
  item,
  level = 0,
}: {
  item: TreeItem;
  level?: number;
}) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div
      className={styles.wrapper}
      style={{ marginLeft: `${level * 0.75}rem` }}
    >
      <TreeBranchPill
        item={item}
        onClick={() => setShowChildren((prev) => !prev)}
      />
      {!!item.children && item.children.length > 0 && showChildren && (
        <ul>
          {item.children.map((child) => (
            <TreeBranch key={child.id} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </div>
  );
};
