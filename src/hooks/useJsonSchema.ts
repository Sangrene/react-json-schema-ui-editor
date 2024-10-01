import { useState } from "react";
import { type JSONSchema7 } from "../jsonSchemaTypings";
import { get, setWith, clone, split } from "lodash";

export const useJsonSchema = (init: JSONSchema7 = {}) => {
  const [schema, setSchema] = useState(init);
  const setSchemaProperty = <K extends keyof JSONSchema7>(
    path: `${string}.${K}`,
    property: JSONSchema7[K]
  ) => {
    setSchema((prev) => setWith(clone(prev), path, property, clone));
  };

  const removeSchemaProperty = (propertyPath: string) => {
    setSchema((prev) => {
      const splitedPath = propertyPath.split(".");
      if (splitedPath.length < 2) {
        return prev;
      }
      if (splitedPath.length === 2) {
        const newProperties = clone(prev.properties)!;
        delete newProperties[splitedPath[1]];
        return setWith(clone(prev), `properties`, newProperties, clone);
      }
      const propertyName = splitedPath[splitedPath.length - 1];
      const parentObjectPath = splitedPath
        .filter((_, index) => index < splitedPath.length - 2)
        .join(".");
      const properties = get(schema, parentObjectPath).properties;
      delete properties[propertyName];
      return setWith(
        clone(prev),
        `${parentObjectPath}.properties`,
        properties,
        clone
      );
    });
  };

  const getSchemaProperty = (path: string): JSONSchema7 => {
    return get(schema, path);
  };

  const addPropertyToObject = (path: string, property: string) => {
    setSchema((prev) =>
      setWith(
        clone(prev),
        `${path ? `${path}.` : ""}properties.${property}`,
        { type: "string" },
        clone
      )
    );
  };

  const getPathState = (path?: string) => {
    return path ? getSchemaProperty(path) : schema;
  };

  return {
    schema,
    actions: {
      setSchemaProperty,
      addPropertyToObject,
      removeSchemaProperty,
    },
    derived: {
      getSchemaProperty,
      getPathState,
    },
  };
};
