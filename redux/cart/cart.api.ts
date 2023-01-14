import { Cart } from "../../src/utils/types";
import axios, { AxiosResponse } from "axios";

export const getCartAPI = async () => {
  let response: AxiosResponse<Cart[]> = await axios.get(
    "https://denoapi.onrender.com/carts"
  );
  return response.data;
};

export const addCartAPi = async (id: number) => {
  let response: AxiosResponse<Cart> = await axios.post(
    `https://denoapi.onrender.com/carts`,
    {
      // id: id,
      count: 0,
      productId: id,
    }
  );
  return response.data;
};

export const deleteCartAPi = async (id: number) => {
  let response: AxiosResponse<Cart> = await axios.delete(
    `https://denoapi.onrender.com/carts/${id}`
  );
  return response.data;
};

export const updateCartAPi = async (id: number, count: number) => {
  let response: AxiosResponse<Cart> = await axios.patch(
    `https://denoapi.onrender.com/carts/${id}`,
    {
      count: count,
    }
  );
  return response.data;
};
