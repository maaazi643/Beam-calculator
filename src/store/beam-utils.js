import { v4 as uuidv4 } from "uuid";

export const createNewSpan = (value = "", flexuralRigidity = "") => {
  return { id: uuidv4(), length: "", flexuralRigidity: "" };
};
