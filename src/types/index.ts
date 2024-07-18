export type Company = {
  id: string;
  name: string;
};

export type Location = {
  id: string;
  name: string;
  parentId: string | null;
};

export type Asset = {
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
};

export type Component = {
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorType: string;
  status: "alert" | "operating";
  gatewayId: string;
};

export type TreeItem = (Asset | Component | Location) & {
  children: TreeItem[];
};
