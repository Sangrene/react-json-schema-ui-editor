![NPM Version](https://img.shields.io/npm/v/react-json-schema-ui-editor)
![Tests Status](https://github.com/Sangrene/react-json-schema-ui-editor/actions/workflows/tests.yml/badge.svg)
# React Json Schema Editor
A configurable React component to display and edit a JSON Schema.

## How to use
Coming from a story:
```typescript
Default.args = {
  initialSchema: schema,
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
```