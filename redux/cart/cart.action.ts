import {
  addCartAPi,
  deleteCartAPi,
  getCartAPI,
  updateCartAPi,
} from "./cart.api";
import { AppDispatch } from "../store";
import {
  CART_LOADING,
  CART_ERROR,
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_TO_CART,
} from "./cart.type";
import axios from "axios";

export const getCart = () => async (dispatch: AppDispatch) => {
  dispatch({ type: CART_LOADING });
  try {
    let data = await getCartAPI();
    dispatch({ type: GET_CART, payload: data });
  } catch (e) {
    dispatch({ type: CART_ERROR });
  }
};

export const addToCart = (id: number) => (dispatch: AppDispatch) => {
  dispatch({ type: CART_LOADING });

  addCartAPi(id)
    .then((res) => dispatch({ type: ADD_TO_CART, payload: res }))
    .catch((err) => dispatch({ type: CART_ERROR }));
};

export const deleteFromCart = (id: number) => (dispatch: AppDispatch) => {
  dispatch({ type: CART_LOADING });

  deleteCartAPi(id)
    .then((res) => {
      dispatch({ type: REMOVE_FROM_CART, payload: id });
    })
    .catch((err) => dispatch({ type: CART_ERROR }));
};

export const updateCart =
  (id: number, count: number) => (dispatch: AppDispatch) => {
    dispatch({ type: CART_LOADING });

    updateCartAPi(id, count)
      .then((res) => {
        dispatch({ type: UPDATE_TO_CART, payload: { id, count } });
      })
      .catch((err) => dispatch({ type: CART_ERROR }));
  };
