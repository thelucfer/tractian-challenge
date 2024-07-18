import { TreeItem } from "@/types";
import styles from "./TreeBranch.module.css";
import { useEffect, useState } from "react";
import { TreeBranchPill } from "./TreeBranchPill";

export const TreeBranch = ({
  item,
  selectedItems,
  level = 0,
  searchActive,
}: {
  item: TreeItem;
  level?: number;
  selectedItems: string[];
  searchActive: boolean;
}) => {
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    if (showChildren) return;
    if (!searchActive) return;
    if (!selectedItems.includes(item.id)) return;

    setShowChildren(true);
  }, [showChildren, selectedItems, item]);

  if (selectedItems.length > 0 && !selectedItems.includes(item.id)) {
    return null;
  }

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
            <TreeBranch
              key={child.id}
              item={child}
              level={level + 1}
              selectedItems={selectedItems}
              searchActive={searchActive}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
