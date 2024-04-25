import History from "@history";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  getShippingCost,
  selectCartTotal,
  selectCartWeight,
  updateSumOfOriginalPrice,
  updateSumOfSellPrice,
} from "app/store/shopSlice";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Product } from "../products/Product";
import { ShopLocationCard } from "../ShopLocationCard";
import { selectUser } from "app/store/userSlice";

const schema = yup.object().shape({
  coupon: yup.string(),
});

const defaultValues = {
  zip: "",
  city: "",
  country: "pk",
  province: "punjab",
};

export const CartTotals = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const cartWeight = useSelector(selectCartWeight);
  const user = useSelector(selectUser);

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    if (user?.role === "DropShipper") {
      dispatch(updateSumOfSellPrice());
      dispatch(updateSumOfOriginalPrice());
    } else {
      dispatch(updateSumOfOriginalPrice());
    }
    dispatch(getShippingCost(cartWeight)).then(() => History.push("/checkout"));
  }

  return (
    <div className="md:flex p-16">
      <div className="md:flex-col md:w-2/3">
        <Typography variant="h5" className="">
          Cart Totals
        </Typography>
        <div className="border-1 p-16">
          <div className="flex w-full justify-between">
            <Typography className=" uppercase font-bold">SUbtotal</Typography>
            <Typography className="" color="text.secondary">
              ₨{cartTotal}
            </Typography>
          </div>
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-16"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <div className="mt-8 mb-16">
              <Controller
                render={({ field }) => (
                  <FormControl>
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      Shipping
                    </FormLabel>
                    <RadioGroup
                      {...field}
                      aria-label="shipping"
                      name="shipping"
                    >
                      <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label="Cash On delivery: ₨1,750.00 All Pakistan"
                      />
                      <FormControlLabel
                        value="booking"
                        control={<Radio />}
                        label="Booking / Bilty (Advance Payment)"
                      />
                      <FormControlLabel
                        value="warehouse"
                        control={<Radio />}
                        label="Warehouse Store Pickup Madina Arts Faisalabad"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
                name="shipping"
                control={control}
              />
            </div> */}

            <Button
              variant="contained"
              color="secondary"
              className=" w-full my-56"
              aria-label="Sign in"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              style={{ borderRadius: "8px" }}
            >
              Proceed to Checkout
            </Button>
          </form>
        </div>
      </div>
      <div className="md:flex-col md:w-1/3 my-24">
        <Product />
        <ShopLocationCard />
      </div>
    </div>
  );
};
