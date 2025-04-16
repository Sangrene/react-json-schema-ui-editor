import { action, type Story, type StoryDefault } from "@ladle/react";
import {
  JsonSchemaEditor,
  type JsonSchemaEditorProps,
} from "../components/JsonSchemaEditor";
import { schema1 } from "../fixtures/schemaExamples";

export default {
  title: "Editor",
} satisfies StoryDefault<JsonSchemaEditorProps>;

const Editor: Story<JsonSchemaEditorProps> = (args) => (
  <JsonSchemaEditor {...args} />
);

export const Default = Editor.bind({});
Default.args = {
  initialSchema: schema1,
  onChange: action("onChange"),
  renderPropertyName: ({ propertyName }) => (
    <h6 style={{ color: "red" }}>{propertyName}</h6>
  ),
  renderAddPropertyButton: ({ onClick }) => (
    <button onClick={onClick}>+</button>
  ),
  renderRemovePropertyButton: ({ onClick }) => (
    <button onClick={onClick}>Remove</button>
  ),
  renderCollapseButton: ({ isCollapsed, onClick }) => (
    <button onClick={onClick}>{isCollapsed ? ">" : "v"}</button>
  ),
  renderInput: ({ onChange, value, type, field, options, errors, path }) => {
    if(path === "") {
      if(field === "type") {
        return <>ROOT</>
      }
      return <></>
    }
    if (type === "string") {
      return (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value || "")}
          />
          {errors?.map((err) => (
            <span key={err}>{err}</span>
          ))}
        </>
      );
    }
    if (type === "float" || type === "integer") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value || "")}
        />
      );
    }
    if (type === "bigString") {
      return (
        <textarea
          rows={3}
          cols={50}
          value={value}
          onChange={(e) => onChange(e.target.value || "")}
        />
      );
    }
    if (type === "select") {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={field}
          id={`${field}-select`}
        >
          {options?.map((opt) => (
            <option value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    if (type === "enum") {
      return <>ENUM</>;
    }
  },
};

export const Empty = Editor.bind({});
Empty.args = {
  onChange: action("onChange"),
  renderPropertyName: ({ propertyName }) => (
    <h6 style={{ color: "red" }}>{propertyName}</h6>
  ),
  renderAddPropertyButton: ({ onClick }) => (
    <button onClick={onClick}>+</button>
  ),
  renderRemovePropertyButton: ({ onClick }) => (
    <button onClick={onClick}>Remove</button>
  ),
  renderInput: ({ onChange, value, type, field, options }) => {
    if (type === "string") {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value || "")}
        />
      );
    }
    if (type === "float" || type === "integer") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value || "")}
        />
      );
    }
    if (type === "bigString") {
      return (
        <textarea
          rows={3}
          cols={50}
          value={value}
          onChange={(e) => onChange(e.target.value || "")}
        />
      );
    }
    if (type === "select") {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name={field}
          id={`${field}-select`}
        >
          {options?.map((opt) => (
            <option value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    if (type === "enum") {
      return <>ENUM</>;
    }
  },
};
