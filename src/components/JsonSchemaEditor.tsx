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
}

export interface ButtonInputParams {
  onClick: () => void;
}

export interface PropertyNameInputParams {
  propertyName: string;
}
export interface JsonSchemaEditorProps {
  initialSchema?: JSONSchema7;
  path?: string;
  renderInput: (params: InputInputParams) => React.ReactNode;
  renderAddPropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderRemovePropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderPropertyName: (p: PropertyNameInputParams) => React.ReactNode;
}

export const JsonSchemaEditor = ({
  initialSchema,
  renderInput,
  renderAddPropertyButton,
  renderRemovePropertyButton,
  renderPropertyName
}: JsonSchemaEditorProps) => {
  return (
    <JsonSchemaContextProvider init={initialSchema}>
      <JsonSchemaPropertyRow
        renderInput={renderInput}
        renderAddPropertyButton={renderAddPropertyButton}
        renderRemovePropertyButton={renderRemovePropertyButton}
        renderPropertyName={renderPropertyName}
      />
    </JsonSchemaContextProvider>
  );
};
