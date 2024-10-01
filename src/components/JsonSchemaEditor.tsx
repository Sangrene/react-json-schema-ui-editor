import { type JSONSchema7 } from "../jsonSchemaTypings";
import { JsonSchemaContextProvider } from "./JsonSchemaContext";
import { JsonSchemaPropertyRow } from "./JsonSchemaPropertyRow";
import type {
  jsonSchemaPossibleFields,
  jsonSchemaPossibleFieldType,
} from "jsonSchemaDescriptor";

export interface InputInputParams {
  onChange: (value: string | number | string[]) => void;
  value?: string | number;
  field: (typeof jsonSchemaPossibleFields)[number];
  options?: string[];
  type: (typeof jsonSchemaPossibleFieldType)[number];
}

export interface ButtonInputParams {
  onClick: () => void;
}

export interface JsonSchemaEditorProps {
  initialSchema?: JSONSchema7;
  path?: string;
  renderInput: (params: InputInputParams) => React.ReactNode;
  renderAddPropertyButton: (p: ButtonInputParams) => React.ReactNode;
  renderRemovePropertyButton: (p: ButtonInputParams) => React.ReactNode;
}

export const JsonSchemaEditor = ({
  initialSchema,
  renderInput,
  renderAddPropertyButton,
  renderRemovePropertyButton,
}: JsonSchemaEditorProps) => {
  return (
    <JsonSchemaContextProvider init={initialSchema}>
      <JsonSchemaPropertyRow
        renderInput={renderInput}
        renderAddPropertyButton={renderAddPropertyButton}
        renderRemovePropertyButton={renderRemovePropertyButton}
      />
    </JsonSchemaContextProvider>
  );
};
