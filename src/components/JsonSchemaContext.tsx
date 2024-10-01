import { useContext } from "react";
import { createContext } from "react";
import { useJsonSchema } from "../hooks/useJsonSchema";
import { type JSONSchema7 } from "../jsonSchemaTypings";

const JsonSchemaContext = createContext<ReturnType<typeof useJsonSchema>>({
  actions: {
    setSchemaProperty: () => {},
    addPropertyToObject: () => {},
    removeSchemaProperty: () => {}
  },
  schema: {},
  derived: {
    getSchemaProperty: () => ({}),
    getPathState: () => ({})
  },
});

export const JsonSchemaContextProvider: React.FC<{
  children?: React.ReactNode;
  init?: JSONSchema7;
}> = ({ children, init }) => {
  const value = useJsonSchema(init);
  return (
    <JsonSchemaContext.Provider value={value}>
      {children}
    </JsonSchemaContext.Provider>
  );
};

export const useJsonSchemaContext = () => useContext(JsonSchemaContext);
