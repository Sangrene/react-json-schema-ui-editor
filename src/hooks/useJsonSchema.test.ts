import { useJsonSchema } from "./useJsonSchema";
import { schema1 } from "../fixtures/schemaExamples";
import { describe, test, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";

describe("useJsonSchema hook", () => {
  test("Set initial schema properly", () => {
    const {
      result: {
        current: { schema },
      },
    } = renderHook(() => useJsonSchema(schema1));
    expect(schema).toEqual(schema1);
  });

  test("Can update a property", () => {
    const { result } = renderHook(() => useJsonSchema(schema1));
    act(() => {
      result.current.actions.setSchemaProperty(
        "properties.name.type",
        "number"
      );
    });
    expect(result.current.derived.getPathState("properties.name").type).toEqual(
      "number"
    );
  });

  test("Can update a property at root level", () => {
    const { result } = renderHook(() => useJsonSchema(schema1));
    act(() => {
      result.current.actions.setSchemaProperty("title", "Super title");
    });
    expect(result.current.derived.getPathState().title).toEqual("Super title");
  });

  test("Can add a property at root level", () => {
    const { result } = renderHook(() => useJsonSchema(schema1));
    act(() => {
      result.current.actions.setSchemaProperty("description", "Super desc");
    });
    expect(result.current.derived.getPathState().description).toEqual(
      "Super desc"
    );
  });

  test("Can remove a property at root level", () => {
    const { result } = renderHook(() => useJsonSchema(schema1));
    act(() => {
      result.current.actions.removeSchemaProperty("title");
    });
    expect(result.current.derived.getPathState().title).toBeUndefined();
  });

  test("Can remove a field from the properties sub object", () => {
    const { result } = renderHook(() => useJsonSchema(schema1));
    act(() => {
      result.current.actions.removeSchemaProperty("properties.name");
    });
    expect(
      result.current.derived.getPathState().properties?.["name"]
    ).toBeUndefined();
  });

  test("Can remove a nested field", () => {
    const { result } = renderHook(() => useJsonSchema(schema1));
    act(() => {
      result.current.actions.removeSchemaProperty("properties.name.type");
    });
    expect(
      result.current.derived.getPathState("properties.name").type
    ).toBeUndefined();
  });

  test("Can add a property in object properties", () => {
    const { result } = renderHook(() => useJsonSchema(schema1));
    act(() => {
      result.current.actions.addPropertyToObject("", "surname");
    });
    expect(result.current.derived.getPathState("properties.surname")).toEqual({
      type: "string",
    });
  });

  
});
