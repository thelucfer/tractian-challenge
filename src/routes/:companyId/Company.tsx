import { Spinner } from "@/components/Spinner";
import { companiesQuery } from "@/query";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import styles from "./Company.module.css";
import { TreeContainer } from "@/components/TreeContainer";
import { CompanyHeader } from "./CompanyHeader";

export const Company = () => {
  const { companyId } = useParams();

  const {
    data: companies,
    isPending: companiesPending,
    isError: companiesError,
  } = useQuery(companiesQuery());

  const selectedCompany = () => {
    if (!companyId) {
      return undefined;
    }

    if (companiesPending) {
      return undefined;
    }

    return companies?.find((company) => company.id === companyId);
  };

  if (companiesPending || !selectedCompany()) {
    return (
      <div className={styles.loadingWrapper}>
        <Spinner size="10rem" />
      </div>
    );
  }

  if (!selectedCompany() || companiesError) {
    return <Navigate to="/notFound" />;
  }

  return (
    <div className={styles.wrapper}>
      <CompanyHeader selectedCompany={selectedCompany()!} />

      <TreeContainer company={selectedCompany()!} />
    </div>
  );
};
