import { Company } from "@/types";
import styles from "./CompanyHeader.module.css";

export const CompanyHeader = ({
  selectedCompany,
}: {
  selectedCompany: Company;
}) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span className={styles.baseTitle}>Assets </span>
        <span className={styles.subTitle}>/ {selectedCompany?.name} unit</span>
      </h1>
    </header>
  );
};
