import { ICharacterFilterInput } from "@/lib";

export const buildFilterString = (filter: ICharacterFilterInput) => {
  return Object.entries(filter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        // Manejo de arrays: si el array contiene strings, deben ir entre comillas.
        return `${key}: [${value.map((v) => (typeof v === "string" ? `"${v}"` : v)).join(", ")}]`;
      } else if (typeof value === "string") {
        // Manejo de valores de tipo string
        return `${key}: "${value}"`;
      } else if (typeof value === "number") {
        // Manejo de valores de tipo number
        return `${key}: ${value}`;
      } else if (value === null) {
        // Manejo de valores null
        return `${key}: null`;
      }
      // Para cualquier otro tipo de valor, se convierte a string.
      return `${key}: "${String(value)}"`;
    })
    .join(", ");
};
