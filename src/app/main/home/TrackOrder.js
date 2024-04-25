import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, selectOrderDetail } from "app/store/homeSlice";

const defaultValues = {
  orderId: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  orderId: yup.string().required("You must enter a value"),
});

function TrackOrder() {
  const dispatch = useDispatch();
  const orderDetail = useSelector(selectOrderDetail);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors, touchedFields } = formState;

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center mb-8"
          >
            Please enter your Order Id below{" "}
          </Typography>
          <form
            onSubmit={handleSubmit((_data) => {
              console.info(_data);
              dispatch(getOrderDetail(_data.orderId));
            })}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Order ID"
                  variant="outlined"
                  error={!!errors.orderId}
                  helperText={errors?.orderId?.message}
                  required
                  fullWidth
                />
              )}
              name="orderId"
              control={control}
            />
            <Button
              className="px-16 single-product-button mt-16"
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Tarck Order(s)
            </Button>
          </form>

          <Typography
            variant="h1"
            className="mt-48 sm:mt-96 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
          >
            {orderDetail?.orderId}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <Typography
            variant="h5"
            color="text.secondary"
            className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center"
          >
            Your Order status is as above
          </Typography>
        </motion.div>

        <Link className="block font-normal mt-48" to="/">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default TrackOrder;
