import { type JSONSchema7 } from "../jsonSchemaTypings";
import { JsonSchemaContextProvider } from "./JsonSchemaContext";
import { JsonSchemaPropertyRow } from "./JsonSchemaPropertyRow";
import type {
  jsonSchemaPossibleFields,
  jsonSchemaPossibleFieldType,
} from "jsonSchemaDescriptor";

export interface InputInputParams {
  onChange: (value: string | number | string[]) => void;
  value?: string | number | string[];
  field: (typeof jsonSchemaPossibleFields)[number];
  options?: string[];
  type: (typeof jsonSchemaPossibleFieldType)[number];
  errors?: string[];
}

export interface ButtonInputParams {
  onClick: () => void;
}

export interface PropertyNameInputParams {
  propertyName: string;
}

export interface CollapseButtonInputParams {
  onClick: () => void;
  isCollapsed: boolean;
}
export interface JsonSchemaEditorProps {
  initialSchema?: JSONSchema7;
  path?: string;
  renderInput: (params: InputInputParams) => React.ReactNode;
  renderAddPropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderRemovePropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderPropertyName: (p: PropertyNameInputParams) => React.ReactNode;
  renderCollapseButton?: (p: CollapseButtonInputParams) => React.ReactNode;
  onChange?: (json: JSONSchema7) => any;
}

export const JsonSchemaEditor = ({
  initialSchema,
  renderInput,
  renderAddPropertyButton,
  renderRemovePropertyButton,
  renderPropertyName,
  renderCollapseButton,
  onChange,
}: JsonSchemaEditorProps) => {
  return (
    <JsonSchemaContextProvider init={initialSchema} onChange={onChange}>
      <JsonSchemaPropertyRow
        renderInput={renderInput}
        renderAddPropertyButton={renderAddPropertyButton}
        renderRemovePropertyButton={renderRemovePropertyButton}
        renderPropertyName={renderPropertyName}
        renderCollapseButton={renderCollapseButton}
      />
    </JsonSchemaContextProvider>
  );
};
