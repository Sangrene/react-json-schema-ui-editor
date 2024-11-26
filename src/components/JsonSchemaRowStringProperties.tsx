import { useJsonSchemaContext } from "./JsonSchemaContext";
import type { JsonSchemaPropertyRowProps } from "./JsonSchemaPropertyRow";

export const JsonSchemaRowStringProperties = ({
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
          if ((typeof value === "string" && value.length === 0) || !value) {
            removeSchemaProperty(`${getPropertyPath(path)}format`);
            return;
          }
          setSchemaProperty(`${getPropertyPath(path)}format`, value as string);
        },
        value: currentRowState.format,
        type: "select",
        field: "format",
        options: ["", "date", "time", "date-time"],
      })}
    </>
  );
};
