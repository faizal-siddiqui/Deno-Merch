import { Cart } from "../../src/utils/types";
import {
  GET_CART,
  CART_ERROR,
  CART_LOADING,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_TO_CART,
} from "./cart.type";

type CartState = {
  loading: boolean;
  error: boolean;
  data: Cart[];
};

type CartAction = {
  type: string;
  payload?: any;
};

const initialState: CartState = {
  loading: false,
  error: false,
  data: [],
};

const cartReducer = (
  state: CartState = initialState,
  { type, payload }: CartAction
): CartState => {
  switch (type) {
    case CART_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case CART_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_CART: {
      return {
        ...state,
        loading: false,
        data: payload,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        loading: false,
        data: state.data.filter((el) => {
          return el.id != payload;
        }),
      };
    }
    case UPDATE_TO_CART: {
      return {
        ...state,
        loading: false,
        data: state.data.map((el) => {
          if (el.id == payload.id) {
            el.count = payload.count;
          }
          return el;
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
