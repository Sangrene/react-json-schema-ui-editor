import { useState } from "react";
import { type JSONSchema7 } from "../jsonSchemaTypings";
import _ from "lodash";

export const useJsonSchema = (init: JSONSchema7 = {}) => {
  const [schema, setSchema] = useState(init);

  const getPropertyPath = (path?: string) => {
    return `${path ? `${path}.` : ""}` as `${string}.`;
  };
  const setSchemaProperty = <K extends keyof JSONSchema7>(
    path: `${string}.${K}` | K,
    property: JSONSchema7[K]
  ) => {
    setSchema((prev) => _.setWith(_.clone(prev), path, property, _.clone));
  };

  const removeSchemaProperty = (propertyPath: string) => {
    setSchema((prev) => {
      const splitedPath = propertyPath.split(".");
      if (splitedPath.length < 2) {
        return prev;
      }
      if (splitedPath.length === 2) {
        const newProperties = _.clone(prev.properties)!;
        delete newProperties[splitedPath[1]];
        return _.setWith(_.clone(prev), `properties`, newProperties, _.clone);
      }
      const propertyName = splitedPath[splitedPath.length - 1];
      const parentObjectPath = splitedPath
        .filter((_, index) => index < splitedPath.length - 2)
        .join(".");
      const properties = _.get(schema, parentObjectPath).properties;
      delete properties[propertyName];
      return _.setWith(
        _.clone(prev),
        `${parentObjectPath}.properties`,
        properties,
        _.clone
      );
    });
  };

  const getSchemaProperty = (path: string): JSONSchema7 => {
    return _.get(schema, path);
  };

  const addPropertyToObject = (path: string, property: string) => {
    setSchema((prev) =>
      _.setWith(
        _.clone(prev),
        `${path ? `${path}.` : ""}properties.${property}`,
        { type: "string" },
        _.clone
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
      getPropertyPath,
    },
  };
};
