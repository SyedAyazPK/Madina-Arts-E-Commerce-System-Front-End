import { Button, Typography } from "@mui/material";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ProfitCard } from "./ProfitCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cashWithdraw,
  getReports,
  selectReports,
} from "app/store/dropshipperSlice";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { selectUser } from "app/store/userSlice";
import TextField from "@mui/material/TextField";

const defaultValues = {
  amount: "",
};

const schema = yup.object().shape({
  amount: yup.string().required("You must enter a value"),
});

export const ProfitReport = () => {
  const dispatch = useDispatch();
  const [alignment, setAlignment] = React.useState("yearly");
  const dropshipperStats = useSelector(selectReports);
  const [open, setOpen] = React.useState(false);
  const user = useSelector(selectUser);

  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    dispatch(getReports(alignment));
  }, [alignment]);

  return (
    <div>
      <div className="flex justify-between w-full">
        <Typography variant="h5" className="w-full">
          Profit Report
        </Typography>
        <div className="flex w-full justify-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Withdraw
          </Button>
        </div>
      </div>
      <div className="flex items-center w-full py-24">
        <Typography variant="h6" className="pr-16">
          Time Frame
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="yearly" size="small">
            Yearly
          </ToggleButton>
          <ToggleButton value="lastTwoMonth" size="small">
            Last 2 Months
          </ToggleButton>
          <ToggleButton value="monthly" size="small">
            This Month
          </ToggleButton>
          <ToggleButton value="weekly" size="small">
            Last 7 days
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} md={4}>
            <ProfitCard
              heading={
                dropshipperStats?.find((n) => n.orderStatus === "Delivered")
                  ?.unPaidPayment
              }
              content={"Unpaid Earning"}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <ProfitCard
              heading={
                dropshipperStats?.find((n) => n.orderStatus === "Delivered")
                  ?.totalEarning
              }
              content={"Total Earning"}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <ProfitCard
              heading={
                dropshipperStats?.find((n) => n.orderStatus === "Delivered")
                  ?.totalOrders
              }
              content={"Total Orders"}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <ProfitCard
              heading={
                dropshipperStats?.find((n) => n.orderStatus === "Delivered")
                  ?.orderCount
              }
              content={"Received Orders"}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <ProfitCard heading={"0"} content={"Current/Last Payment"} />
          </Grid>
          <Grid item xs={6} md={4}>
            <ProfitCard
              heading={
                dropshipperStats?.find((n) => n.orderStatus === "Delivered")
                  ?.paidPayment
              }
              content={"Total Payment Paid"}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <ProfitCard
              heading={
                dropshipperStats?.find(
                  (n) => n.orderStatus === "Handed Over to Courier"
                )?.totalEarning
              }
              content={"Profit- In transit"}
            />
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Withdraw"}</DialogTitle>
        <DialogContent>
          <form
            className="w-full"
            onSubmit={handleSubmit((_data) =>
              dispatch(
                cashWithdraw({ dropShipperId: user?._id, amount: _data.amount })
              ).then(() => handleClose())
            )}
          >
            <div className=" my-16">
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Withdraw Amount"
                    variant="outlined"
                    error={!!errors.TextField}
                    helperText={errors?.TextField?.message}
                    required
                    fullWidth
                    size="small"
                  />
                )}
                name="amount"
                control={control}
              />
            </div>

            <div className="flex mb-16 items-center justify-center w-full">
              <Button
                className="mx-8"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Withdraw
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
