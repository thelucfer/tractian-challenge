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
  status: "alert" | "operating";
};

export type Component = {
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorType: "energy" | "vibration";
  status: "alert" | "operating";
  gatewayId: string;
};

export type TreeItem = (Asset | Component | Location) & {
  children: TreeItem[];
};

export type ActiveFilters = Array<(item: TreeItem) => boolean>;
