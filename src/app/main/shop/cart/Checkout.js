import History from "@history";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
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
  createCheckout,
  createOrder,
  selectCart,
  selectCartTotal,
  selectShippingCost,
  selectSumOfOriginalPrice,
  selectSumOfSellPrice,
} from "app/store/shopSlice";
import { selectUser } from "app/store/userSlice";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Product } from "../products/Product";
import { ShopLocationCard } from "../ShopLocationCard";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  // fname: yup.string().required('You must enter a value'),
  // lname: yup.string().required('You must enter a value'),
  // street: yup.string().required('You must enter a value'),
  // city: yup.string().required('You must enter a value'),
  // province: yup.string().required('You must enter a value'),
  // zip: yup.string().required('You must enter a value'),
  // phone: yup.string().required('You must enter a value'),
  email: yup.string().email("Please provide valid format"),
  phone: yup.string().required("You must enter phone"),
  notes: yup.string().min(20, "Should be min 20 characters"),
  province: yup.string().required("You must enter a value"),
});

const defaultValues = {
  zip: "",
  city: "",
  country: "pakistan",
  province: "punjab",
  street: "",
};

export const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectUser);
  const shippingCost = useSelector(selectShippingCost);
  const sumOfOriginalPrice = useSelector(selectSumOfOriginalPrice);
  const sumOfSellPrice = useSelector(selectSumOfSellPrice);
  const [method, setMethod] = useState("Cash On delivery");

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues: user,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onSubmit(data) {
    [
      "totalSpent",
      "role",
      "resetToken",
      "resetTokenExpiration",
      "_id",
      "password",
      "name",
      "createdAt",
      "updatedAt",
    ].forEach((k) => delete data[k]);
    delete data.data;
    const updatedData = {
      ...data,
      products: cart,
      totalPrice: cartTotal,
      totalQty: cart.reduce((n, { quantity }) => n + quantity, 0),
      country: "Pakistan",
      user: user._id ? user._id : null,
      sumOfOriginalPrice: sumOfOriginalPrice,
      sumOfSellPrice: sumOfSellPrice,
    };
    dispatch(createCheckout(updatedData)).then(
      (response) =>
        response.payload?.status == 200 && History.push("/order-summary")
    );
  }

  return (
    <div className="md:flex p-16">
      <div className="md:flex-col md:w-2/3">
        <Typography variant="h5" className="my-24">
          Billing & Shipping
        </Typography>
        <div className="border-1 p-16">
          <div className="flex w-full justify-between">
            <Typography className=" uppercase font-bold">SUbtotal</Typography>
            <Typography className="" color="text.secondary">
              ₨{cartTotal}
            </Typography>
          </div>
          {user.role === "DropShipper" ? (
            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="fname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Your Customer's First name"
                    size="small"
                    type="text"
                    error={!!errors.fname}
                    helperText={errors?.fname?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your First Name"
                  />
                )}
              />
              <Controller
                name="lname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Your Customer's Last name"
                    size="small"
                    type="text"
                    error={!!errors.lname}
                    helperText={errors?.lname?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your Last Name"
                  />
                )}
              />
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Your Customer's Street address "
                    size="small"
                    type="text"
                    error={!!errors.strret}
                    helperText={errors?.strret?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="House number and street name"
                  />
                )}
              />
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.city} required fullWidth>
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      Your Customer's City
                    </FormLabel>
                    <Select
                      {...field}
                      variant="outlined"
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="Lahore">Lahore</MenuItem>
                      <MenuItem value="Islamabad">Islamabad</MenuItem>
                      <MenuItem value="Karachi">Karachi</MenuItem>
                      <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="city"
                control={control}
              />
              <div className="mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors.Select} required fullWidth>
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        Your Customer's State / Country
                      </FormLabel>
                      <Select
                        {...field}
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="Azad Kashmir">Azad Kashmir</MenuItem>
                        <MenuItem value="Balochistan">Balochistan</MenuItem>
                        <MenuItem value="FATA">FATA</MenuItem>
                        <MenuItem value="Gilgit Baltistan">
                          Gilgit Baltistan
                        </MenuItem>
                        <MenuItem value="Islamabad Capital Territory">
                          Islamabad Capital Territory
                        </MenuItem>
                        <MenuItem value="Khyber Pakhthunkhwa">
                          Khyber Pakhthunkhwa
                        </MenuItem>
                        <MenuItem value="Punjab">Punjab</MenuItem>
                        <MenuItem value="Sindh">Sindh</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  name="province"
                  control={control}
                />
              </div>
              <Controller
                name="zip"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Your Customer's Zip Code"
                    size="small"
                    type="text"
                    error={!!errors.zip}
                    helperText={errors?.zip?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your Zip Code"
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Your Customer's Phone"
                    size="small"
                    type="text"
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your phone"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Email Address"
                    size="small"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your Email"
                  />
                )}
              />
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Order Notes (Optional)"
                    size="small"
                    type="text"
                    variant="outlined"
                    fullWidth
                    placeholder="Notes about your order"
                    error={!!errors.notes}
                    helperText={errors?.notes?.message}
                  />
                )}
              />
              <Controller
                name="register"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Create an Account"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />
              <div className="mt-8 mb-16"></div>

              <Typography variant="h5" className="my-24">
                Your Order
              </Typography>
              <div className="border-1 w-full">
                <div className="flex justify-between w-full">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    product
                  </Typography>
                  <Typography className=" uppercase font-bold w-full p-8">
                    Details
                  </Typography>
                </div>
                {cart.map((item) => (
                  <div className="border-1 flex w-full justify-between border-b-1">
                    <Typography className="w-full border-r-1 p-8">
                      {item.title} x {item.quantity}
                    </Typography>{" "}
                    <Typography
                      className="w-full border-r-1 p-8"
                      color="text.secondary"
                    >
                      Rs {item.quantity * item.price}
                    </Typography>{" "}
                  </div>
                ))}
                <div className="border-1 flex w-full justify-between border-b-1">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    subtotal
                  </Typography>
                  <Typography
                    className="w-full border-r-1 p-8"
                    color="text.secondary"
                  >
                    Rs {cartTotal}
                  </Typography>{" "}
                </div>
                <div className="border-1 flex w-full justify-between border-b-1">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    shipping
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <FormControl className="p-8 w-full">
                        <RadioGroup
                          {...field}
                          aria-label="shipping"
                          name="shipping"
                          onChange={(e) => setMethod(e.target.value)}
                          value={method}
                        >
                          <FormControlLabel
                            value="Cash On delivery"
                            control={<Radio />}
                            label={`Cash On delivery: ₨ ${shippingCost?.shippingCostCalculationPrice?.ruleCost} All Pakistan`}
                          />
                          <FormControlLabel
                            value="Booking / Bilty (Advance Payment)"
                            control={<Radio />}
                            label="Booking / Bilty (Advance Payment)"
                          />
                          <FormControlLabel
                            value="Warehouse Store Pickup"
                            control={<Radio />}
                            label="Warehouse Store Pickup Madina Arts Faisalabad"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                    name="method"
                    control={control}
                  />
                </div>
                <div className="border-1 flex w-full justify-between border-b-1">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    total
                  </Typography>
                  <Typography
                    className="w-full border-r-1 p-8"
                    color="text.secondary"
                  >
                    Rs{" "}
                    {method === "Cash On delivery"
                      ? shippingCost?.shippingCostCalculationPrice?.ruleCost +
                        cartTotal
                      : cartTotal}
                  </Typography>{" "}
                </div>
              </div>

              <Button
                variant="contained"
                color="secondary"
                className=" w-full my-56"
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
                style={{ borderRadius: "8px" }}
              >
                Place order
              </Button>
            </form>
          ) : (
            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="fname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="First name"
                    size="small"
                    type="text"
                    error={!!errors.fname}
                    helperText={errors?.fname?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your First Name"
                  />
                )}
              />
              <Controller
                name="lname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Last name"
                    size="small"
                    type="text"
                    error={!!errors.lname}
                    helperText={errors?.lname?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your Last Name"
                  />
                )}
              />
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Street address "
                    size="small"
                    type="text"
                    error={!!errors.strret}
                    helperText={errors?.strret?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="House number and street name"
                  />
                )}
              />
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.city} required fullWidth>
                    <FormLabel
                      className="font-medium text-14"
                      component="legend"
                    >
                      City
                    </FormLabel>
                    <Select
                      {...field}
                      variant="outlined"
                      fullWidth
                      size="small"
                    >
                      <MenuItem value="Lahore">Lahore</MenuItem>
                      <MenuItem value="Islamabad">Islamabad</MenuItem>
                      <MenuItem value="Karachi">Karachi</MenuItem>
                      <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="city"
                control={control}
              />
              <div className="mb-16">
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors.Select} required fullWidth>
                      <FormLabel
                        className="font-medium text-14"
                        component="legend"
                      >
                        State / Country
                      </FormLabel>
                      <Select
                        {...field}
                        variant="outlined"
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="Azad Kashmir">Azad Kashmir</MenuItem>
                        <MenuItem value="Balochistan">Balochistan</MenuItem>
                        <MenuItem value="FATA">FATA</MenuItem>
                        <MenuItem value="Gilgit Baltistan">
                          Gilgit Baltistan
                        </MenuItem>
                        <MenuItem value="Islamabad Capital Territory">
                          Islamabad Capital Territory
                        </MenuItem>
                        <MenuItem value="Khyber Pakhthunkhwa">
                          Khyber Pakhthunkhwa
                        </MenuItem>
                        <MenuItem value="Punjab">Punjab</MenuItem>
                        <MenuItem value="Sindh">Sindh</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  name="province"
                  control={control}
                />
              </div>
              <Controller
                name="zip"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Zip Code"
                    size="small"
                    type="text"
                    error={!!errors.zip}
                    helperText={errors?.zip?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your Zip Code"
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Phone"
                    size="small"
                    type="text"
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your phone"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Email Address"
                    size="small"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder="Enter your Email"
                  />
                )}
              />
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-12"
                    label="Order Notes (Optional)"
                    size="small"
                    type="text"
                    variant="outlined"
                    fullWidth
                    placeholder="Notes about your order"
                    error={!!errors.notes}
                    helperText={errors?.notes?.message}
                  />
                )}
              />
              <Controller
                name="register"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Create an Account"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />
              <div className="mt-8 mb-16"></div>

              <Typography variant="h5" className="my-24">
                Your Order
              </Typography>
              <div className="border-1 w-full">
                <div className="flex justify-between w-full">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    product
                  </Typography>
                  <Typography className=" uppercase font-bold w-full p-8">
                    Details
                  </Typography>
                </div>
                {cart.map((item) => (
                  <div className="border-1 flex w-full justify-between border-b-1">
                    <Typography className="w-full border-r-1 p-8">
                      {item.title} x {item.quantity}
                    </Typography>{" "}
                    <Typography
                      className="w-full border-r-1 p-8"
                      color="text.secondary"
                    >
                      Rs {item.quantity * item.price}
                    </Typography>{" "}
                  </div>
                ))}
                <div className="border-1 flex w-full justify-between border-b-1">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    subtotal
                  </Typography>
                  <Typography
                    className="w-full border-r-1 p-8"
                    color="text.secondary"
                  >
                    Rs {cartTotal}
                  </Typography>{" "}
                </div>
                <div className="border-1 flex w-full justify-between border-b-1">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    shipping
                  </Typography>
                  <Controller
                    render={({ field }) => (
                      <FormControl className="p-8 w-full">
                        <RadioGroup
                          {...field}
                          aria-label="shipping"
                          name="shipping"
                          onChange={(e) => setMethod(e.target.value)}
                          value={method}
                        >
                          <FormControlLabel
                            value="Cash On delivery"
                            control={<Radio />}
                            label={`Cash On delivery: ₨ ${shippingCost?.shippingCostCalculationPrice?.ruleCost} All Pakistan`}
                          />
                          {cartTotal > 39999 && (
                            <FormControlLabel
                              value="Booking / Bilty (Advance Payment)"
                              control={<Radio />}
                              label="Booking / Bilty (Advance Payment)"
                            />
                          )}

                          <FormControlLabel
                            value="Warehouse Store Pickup"
                            control={<Radio />}
                            label="Warehouse Store Pickup Madina Arts Faisalabad"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                    name="method"
                    control={control}
                  />
                </div>
                <div className="border-1 flex w-full justify-between border-b-1">
                  <Typography className="w-full uppercase font-bold border-r-1 p-8">
                    total
                  </Typography>
                  <Typography
                    className="w-full border-r-1 p-8"
                    color="text.secondary"
                  >
                    Rs{" "}
                    {method === "Cash On delivery"
                      ? shippingCost?.shippingCostCalculationPrice?.ruleCost +
                        cartTotal
                      : cartTotal}
                  </Typography>{" "}
                </div>
              </div>

              <Button
                variant="contained"
                color="secondary"
                className=" w-full my-56"
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
                style={{ borderRadius: "8px" }}
              >
                Place order
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className="md:flex-col md:w-1/3 my-24">
        <Product />
        <ShopLocationCard />
      </div>
    </div>
  );
};
