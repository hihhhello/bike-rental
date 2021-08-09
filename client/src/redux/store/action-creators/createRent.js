import { CREATE_RENT } from "../../types/createRent";

export const createRent = (name, type, price) => {
  return {
    type: CREATE_RENT,
    payload: { name, type, price },
  };
};
