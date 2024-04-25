import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  categories: { results: [] },
  categoriesForFilter: [],
  products: { results: [] },
  productsByCategory: [],
  singleProduct: {},
  productByVariation: {},
  brands: [],
  brandsForFilter: [],
  newNav: [
    {
      id: "Home-component",
      title: "Home",
      type: "item",
      url: "/",
    },
    {
      id: "Track-component",
      title: "Track Order",
      type: "item",
      url: "/track-order",
    },
  ],
  orderDetail: {},
};

export const getCategories = createAsyncThunk(
  "home/getCategories",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/category`);
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
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

export const getCategoriesMenu = createAsyncThunk(
  "home/getCategoriesMenu",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/category`);
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
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

export const getBrands = createAsyncThunk(
  "home/getBrands",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/brand`);
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
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

export const getProducts = createAsyncThunk(
  "home/getProducts",
  async (categoryId, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/product`);
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
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

export const getProductsByCategory = createAsyncThunk(
  "home/getProductsByCategory",
  async (categoryId, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v2/product`, {
        params: { category: categoryId },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      // dispatch(
      //   showMessage({
      //     message: "error",
      //     autoHideDuration: 2000,
      //     variant: "error",
      //     anchorOrigin: {
      //       vertical: "top",
      //       horizontal: "right",
      //     },
      //   })
      // );
      return null;
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "home/getSingleProduct",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/product/${id}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
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

export const getProductByVariation = createAsyncThunk(
  "home/getProductByVariation",
  async (params, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/product/by-variation`,
        params
      );
      const data = await response.data;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
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

export const productFilters = createAsyncThunk(
  "home/productFilters",
  async (filters, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/filter/products`,
        filters
      );
      const data = await response.data;
      // dispatch(
      //   showMessage({
      //     message: "Order placed",
      //     autoHideDuration: 2000,
      //     variant: "success",
      //     anchorOrigin: {
      //       vertical: "top",
      //       horizontal: "right",
      //     },
      //   })
      // );
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

export const postReview = createAsyncThunk(
  "home/postReview",
  async (reviewData, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/review`,
        reviewData
      );
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Review posted!",
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
          message: "error",
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

export const getOrderDetail = createAsyncThunk(
  "home/getOrderDetail",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v2/order?orderId=${id}`
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

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.categoriesForFilter = action.payload.result;
    },
    [getCategoriesMenu.pending]: (state, action) => {
      state.newNav = [
        {
          id: "Home-component",
          title: "Home",
          type: "item",
          url: "/",
        },
        {
          id: "Track-component",
          title: "Track Order",
          type: "item",
          url: "/track-order",
        },
      ];
    },
    [getCategoriesMenu.fulfilled]: (state, action) => {
      action.payload.result?.map((category) =>
        state.newNav.push({
          id: category._id,
          title: category.title,
          type: "item",
          url: `/shop/category/${category._id}`,
        })
      );
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },

    [getProductsByCategory.fulfilled]: (state, action) => {
      state.productsByCategory = action.payload;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.singleProduct = action.payload?.result?.[0];
    },
    [getProductByVariation.fulfilled]: (state, action) => {
      state.productByVariation = action.payload?.result?.[0];
    },
    [getBrands.fulfilled]: (state, action) => {
      state.brands = action.payload.result;
      state.brandsForFilter = action.payload.result;
    },
    [productFilters.fulfilled]: (state, action) => {
      state.productsByCategory = action.payload;
    },
    [getOrderDetail.fulfilled]: (state, action) => {
      state.orderDetail = action.payload;
    },
  },
});

export const {} = homeSlice.actions;

export const selectCategories = ({ home }) => home.categories;
export const selectCategoriesForFilter = ({ home }) => home.categoriesForFilter;
export const selectBrands = ({ home }) => home.brands;
export const selectBrandsForFilter = ({ home }) => home.brandsForFilter;
export const selectProducts = ({ home }) => home.products;
export const selectProductsByCategory = ({ home }) => home.productsByCategory;
export const selectSingleProduct = ({ home }) => home.singleProduct;
export const selectNav = ({ home }) => home.newNav;
export const selectProductByVariation = ({ home }) => home.productByVariation;
export const selectOrderDetail = ({ home }) => home.orderDetail;

export default homeSlice.reducer;
