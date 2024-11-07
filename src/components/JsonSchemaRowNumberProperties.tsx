import { useJsonSchemaContext } from "./JsonSchemaContext";
import type { JsonSchemaPropertyRowProps } from "./JsonSchemaPropertyRow";

export const JsonSchemaRowNumberProperties = ({
  renderInput,
  path,
}: JsonSchemaPropertyRowProps) => {
  const {
    derived: { getPropertyPath, getPathState },
    actions: { setSchemaProperty, removeSchemaProperty },
  } = useJsonSchemaContext();
  const currentRowState = getPathState(path);
  return (
    <>
      {renderInput({
        onChange: (value) => {
          if (typeof value === "string" && value.length === 0) {
            removeSchemaProperty(`${getPropertyPath(path)}minimum`);
            return;
          }
          setSchemaProperty(
            `${getPropertyPath(path)}minimum`,
            Number(value) as number
          );
        },
        value: currentRowState.minimum,
        type: "float",
        field: "minimum",
      })}
      {renderInput({
        onChange: (value) => {
          if (typeof value === "string" && value.length === 0) {
            removeSchemaProperty(`${getPropertyPath(path)}maximum`);
            return;
          }
          setSchemaProperty(
            `${getPropertyPath(path)}maximum`,
            Number(value) as number
          );
        },
        value: currentRowState.maximum,
        type: "float",
        field: "maximum",
      })}
    </>
  );
};
