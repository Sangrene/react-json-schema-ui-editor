import { useEffect, useRef, useState } from "react";
import { type JSONSchema7 } from "../jsonSchemaTypings";
import _ from "lodash";
import { EmptyPropertyNameError } from "./errors";

export const useJsonSchema = (
  init: JSONSchema7 = {},
  onChange?: (schema: JSONSchema7) => any
) => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);
  const [errors, setErrors] = useState<{ path: string; error: Error }[]>([]);

  const [schema, setSchema] = useState(_.cloneDeep(init));
  useEffect(() => {
    if (onChange && !isFirstRender.current) {
      onChange(schema);
    }
  }, [schema]);

  const getPropertyPath = (path?: string) => {
    return `${path ? `${path}.` : ""}` as `${string}.`;
  };
  const setSchemaProperty = <K extends keyof JSONSchema7>(
    path: `${string}.${K}` | K,
    property: JSONSchema7[K]
  ) => {
    if (
      typeof property === "undefined" ||
      (typeof property === "string" && property.length === 0) ||
      (Array.isArray(property) && property.length === 0)
    ) {
      removeSchemaProperty(path);
      return;
    }
    setSchema((prev) => {
      const splittedPath = path.split(".");
      if (
        splittedPath[splittedPath.length - 1] === "type" &&
        property === "array"
      ) {
        return _.setWith(
          _.setWith(_.cloneDeep(prev), path, property, _.cloneDeep),
          `${getPropertyPath(splittedPath.slice(0, -1).join("."))}items`,
          { type: "string" },
          _.cloneDeep
        );
      }
      return _.setWith(_.cloneDeep(prev), path, property, _.cloneDeep);
    });
  };

  const removeSchemaProperty = (propertyPath: string) => {
    setSchema((prev) => {
      const splitedPath = propertyPath.split(".");
      if (splitedPath.length < 2) {
        const newSchema = _.cloneDeep(prev);
        delete newSchema[splitedPath[0] as keyof JSONSchema7];
        return newSchema;
      }
      const parentObjectPath = splitedPath.slice(0, -1).join(".");
      const parentObject = _.get(prev, parentObjectPath);
      const propertyBeingRemoved = splitedPath[splitedPath.length - 1];
      delete parentObject[propertyBeingRemoved];
      return _.setWith(
        _.cloneDeep(prev),
        parentObjectPath,
        parentObject,
        _.cloneDeep
      );
    });
  };

  const getSchemaProperty = (path: string): JSONSchema7 => {
    return _.get(schema, path);
  };

  const addPropertyToObject = (path: string, property: string) => {
    if (property.length === 0) {
      setErrors((prev) => [
        ...prev.filter((e) => e.path !== path),
        {
          path,
          error: new EmptyPropertyNameError("Property name can't be empty"),
        },
      ]);
      return;
    }
    setSchema((prev) =>
      _.setWith(
        _.cloneDeep(prev),
        `${path ? `${path}.` : ""}properties.${property}`,
        { type: "string" },
        _.cloneDeep
      )
    );
    setErrors((prev) =>
      prev.filter(
        (e) => e.path !== path && e.error instanceof EmptyPropertyNameError
      )
    );
  };

  const getPathState = (path?: string) => {
    return path ? getSchemaProperty(path) : schema;
  };

  const getPathErrors = (path: string) =>
    errors.filter((e) => e.path === path).map((e) => e.error);

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
      getPathErrors,
    },
  };
};
