

export const jsonSchemaAvailableTypes = ["string", "number", "integer", "boolean", "object", "array"] as const;

export const jsonSchemaPossibleFields = ["type", "description", "title", "property", "minimum", "maximum", "enum", "format"] as const;

export const jsonSchemaPossibleFieldType = ["select", "integer", "float", "string", "bigString", "enum"] as const