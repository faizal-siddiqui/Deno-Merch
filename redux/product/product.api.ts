import { Product } from "../../src/utils/types";
import axios, { AxiosResponse } from "axios";

export const getProductsAPI = async () => {
  let response: AxiosResponse<Product[]> = await axios.get(
    "https://denoapi.onrender.com/products"
  );
  return response.data;
};
