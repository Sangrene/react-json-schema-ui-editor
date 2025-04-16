import { useEffect, useState } from "react";
import { useJsonSchemaContext } from "./JsonSchemaContext";
import type {
  ButtonInputParams,
  CollapseButtonInputParams,
  InputInputParams,
  PropertyNameInputParams,
} from "./JsonSchemaEditor";
import type { JSONSchema7TypeName } from "jsonSchemaTypings";
import { jsonSchemaAvailableTypes } from "jsonSchemaDescriptor";
import { JsonSchemaAddProperty } from "./JsonSchemaAddProperty";
import { JsonSchemaRowNumberProperties } from "./JsonSchemaRowNumberProperties";
import { JsonSchemaRowStringProperties } from "./JsonSchemaRowStringProperties";

export interface JsonSchemaPropertyRowProps {
  path?: string;
  renderInput: (p: InputInputParams) => React.ReactNode;
  renderAddPropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderRemovePropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderPropertyName?: (p: PropertyNameInputParams) => React.ReactNode;
  renderCollapseButton?: (p: CollapseButtonInputParams) => React.ReactNode;
  name?: string;
  key?: string;
  isArrayItems?: boolean;
}

export const JsonSchemaPropertyRow = ({
  path,
  renderInput,
  name,
  renderAddPropertyButton,
  renderRemovePropertyButton,
  renderPropertyName,
  renderCollapseButton,
  isArrayItems,
}: JsonSchemaPropertyRowProps) => {
  const {
    derived: { getPathState, getPropertyPath },
    actions: { setSchemaProperty, removeSchemaProperty },
  } = useJsonSchemaContext();

  const currentRowState = getPathState(path);
  const currentRowIsObject = currentRowState.type === "object";
  const currentRowIsArray = currentRowState.type === "array";
  const [isRowCollapsed, setRowCollapsed] = useState(currentRowIsObject);

  const toggleCollapse = () => {
    setRowCollapsed((p) => !p);
  };
  return (
    <div
      style={{ marginLeft: path ? "16px" : 0, marginTop: path ? "16px" : 0 }}
    >
      <div style={{ display: "flex", alignItems: "start" }}>
        {renderCollapseButton &&
          currentRowIsObject &&
          renderCollapseButton({
            onClick: toggleCollapse,
            isCollapsed: isRowCollapsed,
          })}
        {name &&
          renderPropertyName &&
          renderPropertyName({ propertyName: name })}

        {renderInput({
          onChange: (value) => {
            setSchemaProperty(
              `${getPropertyPath(path)}type`,
              value as JSONSchema7TypeName
            );
          },
          value: currentRowState.type,
          type: "select",
          field: "type",
          options: [...jsonSchemaAvailableTypes],
          path: path || "",
        })}
        {renderInput({
          onChange: (value) => {
            setSchemaProperty(
              `${getPropertyPath(path)}description`,
              value as string
            );
          },
          value: currentRowState.description,
          type: "bigString",
          field: "description",
          path: path || "",
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
        {currentRowState.type === "string" && (
          <JsonSchemaRowStringProperties
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
              if (
                currentRowState.type === "integer" ||
                currentRowState.type === "number"
              ) {
                setSchemaProperty(
                  `${getPropertyPath(path)}enum`,
                  (value as (string | number)[]).map((val) => Number(val))
                );
                return;
              }
              setSchemaProperty(
                `${getPropertyPath(path)}enum`,
                value as string[]
              );
            },
            value: currentRowState.enum as string[],
            type: "enum",
            field: "enum",
            path: path || "",
          })}

        {currentRowIsObject && (
          <JsonSchemaAddProperty
            renderAddPropertyButton={renderAddPropertyButton}
            renderInput={renderInput}
            path={path}
            onClickAddProperty={() => {
              if (isRowCollapsed) setRowCollapsed(false);
            }}
          />
        )}
        {path &&
          !isArrayItems &&
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
            !isRowCollapsed &&
            Object.keys(currentRowState.properties || {}).map((prop) => (
              <JsonSchemaPropertyRow
                renderInput={renderInput}
                renderAddPropertyButton={renderAddPropertyButton}
                renderRemovePropertyButton={renderRemovePropertyButton}
                renderPropertyName={renderPropertyName}
                renderCollapseButton={renderCollapseButton}
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
              renderCollapseButton={renderCollapseButton}
              path={`${getPropertyPath(path)}items`}
              name={`${name || ""} items`}
              isArrayItems
            />
          )}
        </div>
      </div>
    </div>
  );
};
