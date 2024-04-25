import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Grid, Typography } from "@mui/material";
import {
  getAllOrders,
  getOrders,
  selectCount,
  selectOrders,
} from "app/store/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "./OrderTable";

export const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const count = useSelector(selectCount);

  useEffect(() => {
    dispatch(getOrders());
    // dispatch(getAllOrders());
  }, []);

  return (
    <div className=" ">
      <OrderTable />
    </div>
  );
};
