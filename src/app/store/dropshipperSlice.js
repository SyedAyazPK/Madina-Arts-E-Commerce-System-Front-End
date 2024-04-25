import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  reports: [],
};

export const getReports = createAsyncThunk(
  "dropshipper/getReports",
  async (duration, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/report/dropshipper-stats`,
        {
          duration: duration,
        }
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

export const cashWithdraw = createAsyncThunk(
  "dropshipper/cashWithdraw",
  async (withdraw, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v2/cash-withdraw`,
        withdraw
      );
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Withdraw request sent",
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

const dropshipperSlice = createSlice({
  name: "dropshipper",
  initialState,
  reducers: {},
  extraReducers: {
    [getReports.fulfilled]: (state, action) => {
      state.reports = action.payload.result;
    },
  },
});

export const {} = dropshipperSlice.actions;

export const selectReports = ({ dropshipper }) => dropshipper.reports;

export default dropshipperSlice.reducer;
