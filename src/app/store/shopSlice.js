import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import axios from "axios";
import { showMessage } from "./fuse/messageSlice";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  quantity: 1,
  cart: [],
  cartSubTotal: 0,
  cartTotal: 0,
  cartWeight: 0,
  checkout: null,
  itemSubtotal: 0,
  variationIds: [],
  orderSummary: [],
  shippingCost: {},
  sumOfSellPrice: 0,
  sumOfOriginalPrice: 0,
};

export const createCheckout = createAsyncThunk(
  "shop/createCheckout",
  async (checkout, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/checkout`,
        checkout
      );
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Order placed",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const createOrder = createAsyncThunk(
  "shop/createOrder",
  async (checkoutId, { dispatch, getState }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/v2/order`, {
        checkout: checkoutId,
      });
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Order placed",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

export const getShippingCost = createAsyncThunk(
  "shop/getShippingCost",
  async (weight, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/shippingzone/shipping-cost`,
        {
          weight: weight,
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: error.response.data.message,
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      state.quantity = state.quantity + 1;
      var totalWeight = 0;
      state.cart.forEach((item) => {
        totalWeight = totalWeight + item.weight;
      });
      state.cartWeight = totalWeight;
    },

    decrementQuantity: (state, action) => {
      if (state.quantity > 0) {
        state.quantity = state.quantity - 1;
      }
      var totalWeight = 0;
      state.cart.forEach((item) => {
        totalWeight = totalWeight + item.weight;
      });
      state.cartWeight = totalWeight;
    },
    updateCart: (state, action) => {
      const item = action.payload;
      let index = state.cart.findIndex((cartItem) => item.id === cartItem.id);

      if (index === -1) {
        state.cart.push(item);
      } else {
        state.cart[index] = item;
      }
    },
    incrementCartQuantity: (state, action) => {
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      let total = 0;
      state.cart[index].quantity = state.cart[index].quantity + 1;
      state.cart[index].weight =
        state.cart[index].actualWeight * state.cart[index].quantity;
      state.cart[index].subtotal =
        state.cart[index].quantity * state.cart[index].price;
      state.cart.forEach((item) => {
        total += item.subtotal;
      });
      state.cartTotal = total;
    },
    decrementCartQuantity: (state, action) => {
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      let total = 0;
      if (state.cart[index].quantity > 0) {
        state.cart[index].quantity = state.cart[index].quantity - 1;
        state.cart[index].weight =
          state.cart[index].actualWeight * state.cart[index].quantity;
        state.cart[index].subtotal =
          state.cart[index].quantity * state.cart[index].price;
        state.cart.forEach((item) => {
          total += item.subtotal;
        });
        state.cartTotal = total;
      }
    },
    updateSellPrice: (state, action) => {
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let total = 0;
      state.cart[index].sellPrice = action.payload.price;
      // state.cart[index].sellPrice =
      //   state.cart[index].quantity * action.payload.price;
      // state.cart.forEach((item) => {
      //   total += item.subtotal;
      // });
      // state.cartTotal = total;
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCartSubtotal: (state, action) => {
      state.cartSubTotal = action.payload;
    },
    updateCartTotal: (state, action) => {
      var total = 0;
      state.cart.forEach((item) => {
        total = total + item.subtotal;
      });
      state.cartTotal = total;
    },
    setVariationIds: (state, action) => {
      state.variationIds = action.payload;
    },
    updateCartWeight: (state, action) => {
      var totalWeight = 0;
      state.cart.forEach((item) => {
        totalWeight = totalWeight + item.weight;
      });
      state.cartWeight = totalWeight;
    },
    updateSumOfSellPrice: (state, action) => {
      state.sumOfSellPrice = state.cart.reduce((accumulator, currentValue) => {
        return parseInt(accumulator) + parseInt(currentValue.sellPrice);
      }, 0);
    },
    updateSumOfOriginalPrice: (state, action) => {
      state.sumOfOriginalPrice = state.cart.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.price;
        },
        0
      );
    },
  },
  extraReducers: {
    [createCheckout.fulfilled]: (state, action) => {
      state.checkout = action.payload?.data;
      state.orderSummary = state.cart;
      state.cart = [];
    },
    [createOrder.fulfilled]: (state, action) => {
      state.cart = [];
    },
    [getShippingCost.fulfilled]: (state, action) => {
      state.shippingCost = action.payload.result;
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  updateCart,
  incrementCartQuantity,
  decrementCartQuantity,
  removeCartItem,
  updateCartSubtotal,
  updateCartTotal,
  updateSellPrice,
  setVariationIds,
  updateCartWeight,
  updateSumOfSellPrice,
  updateSumOfOriginalPrice,
} = shopSlice.actions;

export const selectQuantity = ({ shop }) => shop.quantity;
export const selectCart = ({ shop }) => shop.cart;
export const selectCartSubtotal = ({ shop }) => shop.cartSubTotal;
export const selectCartTotal = ({ shop }) => shop.cartTotal;
export const selectCartWeight = ({ shop }) => shop.cartWeight;
export const selectShippingCost = ({ shop }) => shop.shippingCost;
export const selectCheckout = ({ shop }) => shop.checkout;
export const selectVariationIds = ({ shop }) => shop.variationIds;
export const selectOrderSummary = ({ shop }) => shop.orderSummary;
export const selectSumOfSellPrice = ({ shop }) => shop.sumOfSellPrice;
export const selectSumOfOriginalPrice = ({ shop }) => shop.sumOfOriginalPrice;

export default shopSlice.reducer;
