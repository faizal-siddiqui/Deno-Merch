import { Product } from "../../src/utils/types";
import axios, { AxiosResponse } from "axios";

export const getProductsAPI = async () => {
  let response: AxiosResponse<Product[]> = await axios.get(
    "http://localhost:8080/products"
  );
  return response.data;
};
