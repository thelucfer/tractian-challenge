import { queryOptions } from "@tanstack/react-query";
import { Asset, Company, Component, Location } from "../types";

const BASE_URL = "https://fake-api.tractian.com";

export const getCompanies = async (): Promise<Company[]> => {
  const res = await fetch(`${BASE_URL}/companies`);

  return res.json();
};

export const getLocations = async (companyId: string): Promise<Location[]> => {
  const res = await fetch(`${BASE_URL}/companies/${companyId}/locations`);

  return res.json();
};

export const getAssets = async (
  companyId: string
): Promise<(Asset | Component)[]> => {
  const res = await fetch(`${BASE_URL}/companies/${companyId}/assets`);

  return res.json();
};

export const companiesQuery = () =>
  queryOptions({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

export const locationsQuery = (companyId: string) =>
  queryOptions({
    queryKey: ["locations", companyId],
    queryFn: () => getLocations(companyId),
  });

export const assetsQuery = (companyId: string) =>
  queryOptions({
    queryKey: ["assets", companyId],
    queryFn: () => getAssets(companyId),
  });
