import { useState } from "react";
import type { ButtonInputParams, InputInputParams } from "./JsonSchemaEditor";
import { useJsonSchemaContext } from "./JsonSchemaContext";

interface JsonSchemaAddPropertyButtonProps {
  renderInput: (p: InputInputParams) => React.ReactNode;
  renderAddPropertyButton: (p: ButtonInputParams) => React.ReactNode;
  path?: string;
}

export const JsonSchemaAddProperty = ({
  renderAddPropertyButton,
  renderInput,
  path,
}: JsonSchemaAddPropertyButtonProps) => {
  const {
    actions: { addPropertyToObject },
  } = useJsonSchemaContext();
  const [propertyToBeAdded, setPropertyToBeAdded] = useState("");

  return (
    <>
      {renderInput({
        onChange: (value) => {
          setPropertyToBeAdded(value as string);
        },
        field: "property",
        type: "string",
        value: propertyToBeAdded,
      })}
      {renderAddPropertyButton({
        onClick: () => {
          addPropertyToObject(path || "", propertyToBeAdded);
          setPropertyToBeAdded("");
        },
      })}
    </>
  );
};
