import { Asset, Component, Location } from "@/types";

type ObjectType = Location | Asset | Component;

export const isLocation = (object: ObjectType): object is Location => {
  return !("locationId" in object);
};

export const isAsset = (object: ObjectType): object is Asset => {
  return (
    "locationId" in object &&
    (!("sensorType" in object) || object.sensorType === null)
  );
};

export const isComponent = (object: ObjectType): object is Component => {
  return "sensorType" in object && object.sensorType !== null;
};
