import { useJsonSchemaContext } from "./JsonSchemaContext";
import type { JsonSchemaPropertyRowProps } from "./JsonSchemaPropertyRow";

export const JsonSchemaRowNumberProperties = ({
  renderInput,
  path,
}: JsonSchemaPropertyRowProps) => {
  const {
    derived,
    actions: { setSchemaProperty },
  } = useJsonSchemaContext();
  const currentRowState = derived.getPathState(path);

  return (
    <>
      {renderInput({
        onChange: (value) => {
          setSchemaProperty(`${path}.minimum`, Number(value) as number);
        },
        value: currentRowState.minimum,
        type: "float",
        field: "minimum",
      })}
      {renderInput({
        onChange: (value) => {
          setSchemaProperty(`${path}.maximum`, Number(value) as number);
        },
        value: currentRowState.maximum,
        type: "float",
        field: "maximum",
      })}
    </>
  );
};
