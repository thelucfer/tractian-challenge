import { Spinner } from "@/components/Spinner";
import { assetsQuery, companiesQuery, locationsQuery } from "@/query";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import styles from "./Company.module.css";
import { useCreateTree } from "@/hooks/useCreateTree";
import { TreeBranch } from "@/components/TreeBranch";

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

  const { data: locations } = useQuery({
    ...locationsQuery(selectedCompany()!.id),
    enabled: !!selectedCompany(),
    initialData: [],
  });

  const { data: assets } = useQuery({
    ...assetsQuery(selectedCompany()!.id),
    enabled: !!selectedCompany(),
    initialData: [],
  });

  const { tree } = useCreateTree({ locations: locations, assets: assets });

  console.log("console.log", tree);

  if (companiesPending || !tree) {
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
      {selectedCompany()?.name}
      {tree.map((item) => (
        <TreeBranch key={item.id} item={item} />
      ))}
    </div>
  );
};
