import { useState } from "react";
import { useJsonSchemaContext } from "./JsonSchemaContext";
import type {
  ButtonInputParams,
  InputInputParams,
  PropertyNameInputParams,
} from "./JsonSchemaEditor";
import type { JSONSchema7TypeName } from "jsonSchemaTypings";
import { jsonSchemaAvailableTypes } from "jsonSchemaDescriptor";
import { JsonSchemaAddProperty } from "./JsonSchemaAddProperty";
import { JsonSchemaRowNumberProperties } from "./JsonSchemaRowNumberProperties";

export interface JsonSchemaPropertyRowProps {
  path?: string;
  renderInput: (p: InputInputParams) => React.ReactNode;
  renderAddPropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderRemovePropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderPropertyName?: (p: PropertyNameInputParams) => React.ReactNode;
  name?: string;
}

export const JsonSchemaPropertyRow = ({
  path,
  renderInput,
  name,
  renderAddPropertyButton,
  renderRemovePropertyButton,
  renderPropertyName,
}: JsonSchemaPropertyRowProps) => {
  const {
    derived: { getPathState, getPropertyPath },
    actions: { setSchemaProperty, removeSchemaProperty },
  } = useJsonSchemaContext();
  const [areChildrenCollapsed, setChildrenCollapsed] = useState(true);

  const currentRowState = getPathState(path);
  const currentRowIsObject = currentRowState.type === "object";
  const currentRowIsArray = currentRowState.type === "array";
  return (
    <div
      style={{ marginLeft: path ? "16px" : 0, marginTop: path ? "16px" : 0 }}
    >
      <div style={{ display: "flex", alignItems: "start" }}>
        {name &&
          renderPropertyName &&
          renderPropertyName({ propertyName: name })}

        {renderInput({
          onChange: (value) => {
            setSchemaProperty(`${getPropertyPath(path)}type`, value as JSONSchema7TypeName);
          },
          value: currentRowState.type,
          type: "select",
          field: "type",
          options: [...jsonSchemaAvailableTypes],
        })}
        {renderInput({
          onChange: (value) => {
            setSchemaProperty(`${getPropertyPath(path)}description`, value as string);
          },
          value: currentRowState.description,
          type: "bigString",
          field: "description",
        })}
        {(currentRowState.type === "number" ||
          currentRowState.type === "integer") && (
          <JsonSchemaRowNumberProperties
            renderAddPropertyButton={renderAddPropertyButton}
            renderInput={renderInput}
            path={path}
            renderRemovePropertyButton={renderRemovePropertyButton}
            name={name}
          />
        )}
        {currentRowState.type &&
          !["object", "array", "boolean"].includes(currentRowState.type) &&
          renderInput({
            onChange: (value) => {
              setSchemaProperty(`${getPropertyPath(path)}enum`, value as string[]);
            },
            value: currentRowState.enum as string[],
            type: "enum",
            field: "enum",
          })}

        {currentRowIsObject && (
          <JsonSchemaAddProperty
            renderAddPropertyButton={renderAddPropertyButton}
            renderInput={renderInput}
            path={path}
          />
        )}
        {path &&
          renderRemovePropertyButton({
            onClick: () => removeSchemaProperty(path),
          })}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            backgroundColor: "#000000",
            minHeight: "100%",
            width: "2px",
            opacity: 0.4,
          }}
        />
        <div>
          {currentRowIsObject &&
            areChildrenCollapsed &&
            Object.keys(currentRowState.properties || {}).map((prop) => (
              <JsonSchemaPropertyRow
                renderInput={renderInput}
                renderAddPropertyButton={renderAddPropertyButton}
                renderRemovePropertyButton={renderRemovePropertyButton}
                renderPropertyName={renderPropertyName}
                key={prop}
                path={`${getPropertyPath(path)}properties.${prop}`}
                name={prop}
              />
            ))}
          {currentRowIsArray && (
            <JsonSchemaPropertyRow
              renderInput={renderInput}
              renderAddPropertyButton={renderAddPropertyButton}
              renderRemovePropertyButton={renderRemovePropertyButton}
              renderPropertyName={renderPropertyName}
              path={`${getPropertyPath(path)}items`}
              name={name}
            />
          )}
        </div>
      </div>
    </div>
  );
};
