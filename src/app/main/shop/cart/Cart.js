import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import * as yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import {
  decrementCartQuantity,
  incrementCartQuantity,
  removeCartItem,
  selectCart,
  updateCartSubtotal,
  updateCartTotal,
  updateCartWeight,
  updateCartssTotal,
  updateSellPrice,
} from "app/store/shopSlice";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { CartTotals } from "./CartTotals";
import { selectUser } from "app/store/userSlice";
import EmptyCartPage from "./EmptyCartPage";

const schema = yup.object().shape({
  coupon: yup.string(),
});

const defaultValues = {
  coupon: "",
};

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit({ coupon }) {
    console.log("coupon", coupon);
  }

  return (
    <div className="md:px-80 px-40">
      {cart.length > 0 && (
        <Typography variant="h5" className="my-24">
          Cart
        </Typography>
      )}

      {cart.length === 0 ? (
        <EmptyCartPage />
      ) : (
        <div>
          {" "}
          <div
            className="border-1   sm:flex hidden w-full"
            style={{ borderRadius: "5px" }}
          >
            <div className="border-r-1 p-8 w-full cursor-pointer">
              <Typography>Remove</Typography>
            </div>
            <div className="border-r-1 p-8 w-full cursor-pointer">
              <Typography>Image</Typography>
            </div>
            <div className="border-r-1 p-8 w-full cursor-pointer ">
              <Typography className=" uppercase font-bold text-center">
                Product
              </Typography>
            </div>
            <div className="border-r-1 p-8 w-full cursor-pointer ">
              <Typography className=" uppercase font-bold text-center">
                PRICE
              </Typography>
            </div>
            <div className="border-r-1 p-8 w-full cursor-pointer ">
              <Typography className=" uppercase font-bold text-center">
                QUANTITY
              </Typography>
            </div>
            {user.role === "DropShipper" && (
              <div className="border-r-1 p-8 w-full cursor-pointer ">
                <Typography className=" uppercase font-bold text-center">
                  SELL PRICE
                </Typography>
              </div>
            )}

            <div className="p-8 w-full cursor-pointer ">
              <Typography className=" uppercase font-bold text-center">
                SUBTOTAL
              </Typography>
            </div>
          </div>
          {cart.map((item) => (
            <>
              <div
                className="border-1 border-t-0 sm:flex hidden w-full justify-center align-center"
                style={{ borderRadius: "5px" }}
              >
                <div className="border-r-1 p-8 w-full cursor-pointer flex justify-center align-center">
                  <FuseSvgIcon
                    className="text-48 pt-8 cursor-pointer"
                    size={48}
                    color="error"
                    onClick={() => {
                      dispatch(removeCartItem(item.id));
                      dispatch(updateCartSubtotal());
                      dispatch(updateCartTotal());
                      dispatch(updateCartWeight());
                    }}
                  >
                    heroicons-solid:x-circle
                  </FuseSvgIcon>
                </div>
                <div className="border-r-1 p-8 w-full cursor-pointer flex justify-center ">
                  <img src={item.image} width={50} height={50} />
                </div>
                <div className="border-r-1 p-8 w-full cursor-pointer ">
                  <Typography className=" uppercase pt-8 text-center">
                    {item.title}
                  </Typography>
                </div>
                <div className="border-r-1 p-8 w-full cursor-pointer ">
                  <Typography className=" uppercase pt-8 text-center">
                    {item.price}
                  </Typography>
                </div>
                <div className="border-r-1 p-8 w-full cursor-pointer ">
                  <Typography className=" uppercase pt-8">
                    <div
                      className="border-1 flex"
                      style={{ borderRadius: "5px" }}
                    >
                      <div
                        className="border-r-1 p-8 w-full cursor-pointer"
                        onClick={() => {
                          dispatch(decrementCartQuantity(item.id));
                          dispatch(updateCartSubtotal());
                          dispatch(updateCartTotal());
                          dispatch(updateCartWeight());
                        }}
                      >
                        <Typography className="text-center">-</Typography>
                      </div>
                      <div className="border-r-1 p-8 w-full cursor-pointer">
                        <Typography className="text-center">
                          {item.quantity}
                        </Typography>
                      </div>
                      <div
                        className="p-8 w-full cursor-pointer"
                        onClick={() => {
                          dispatch(incrementCartQuantity(item.id));
                          dispatch(updateCartSubtotal());
                          dispatch(updateCartTotal());
                          dispatch(updateCartWeight());
                        }}
                      >
                        <Typography className="text-center">+</Typography>
                      </div>
                    </div>
                  </Typography>
                </div>
                {user.role === "DropShipper" && (
                  <div
                    className="border-r-1  p-8 w-full cursor-pointer "
                    style={{
                      paddingLeft: "0.8rem",
                      paddingRight: "0.8rem",
                    }}
                  >
                    <Typography className=" uppercase pt-8">
                      <div style={{ borderRadius: "5px" }}>
                        <div className=" w-full cursor-pointer">
                          <TextField
                            size="small"
                            type="number"
                            variant="outlined"
                            fullWidth
                            defaultValue={item.sellPrice}
                            onChange={(e) =>
                              dispatch(
                                updateSellPrice({
                                  id: item.id,
                                  price: e.target.value,
                                })
                              )
                            }
                          />
                        </div>
                      </div>
                    </Typography>
                  </div>
                )}
                <div className="p-8 w-full cursor-pointer ">
                  <Typography className=" uppercase pt-8 text-center ">
                    {item.subtotal}
                    {/* {item.quantity * item.price} */}
                  </Typography>
                </div>
              </div>
              {/* On mobile View */}
              <div className="flex flex-col sm:hidden border-1">
                <div className="flex justify-between w-full">
                  <FuseSvgIcon
                    className="text-48 pt-8 border-b-1 cursor-pointer"
                    size={48}
                    color="error"
                    onClick={() => {
                      dispatch(removeCartItem(item.id));
                      dispatch(updateCartSubtotal());
                      dispatch(updateCartTotal());
                      dispatch(updateCartWeight());
                    }}
                  >
                    heroicons-solid:x-circle
                  </FuseSvgIcon>
                </div>
                <div className="flex w-full justify-between border-b-1 p-8">
                  <Typography className=" uppercase text-center font-bold">
                    Product:
                  </Typography>
                  <Typography className="  text-center" color="text.secondary">
                    {item.title}
                  </Typography>
                </div>
                <div className="flex w-full justify-between border-b-1 p-8">
                  <Typography className=" uppercase text-center font-bold">
                    Price:
                  </Typography>
                  <Typography className="  text-center" color="text.secondary">
                    {item.price}
                  </Typography>
                </div>
                <div className="flex w-full justify-between border-b-1 p-8">
                  <Typography className=" uppercase text-center font-bold">
                    Quantity:
                  </Typography>
                  <Typography className="  text-center" color="text.secondary">
                    <div
                      className="border-1 flex w-full"
                      style={{ borderRadius: "5px" }}
                    >
                      <div
                        className="border-r-1 p-8 w-full cursor-pointer"
                        onClick={() => {
                          dispatch(incrementCartQuantity(item.id));
                          dispatch(updateCartSubtotal());
                          dispatch(updateCartTotal());
                          dispatch(updateCartWeight());
                        }}
                      >
                        <Typography className="text-center">+</Typography>
                      </div>
                      <div className="border-r-1 p-8 w-full cursor-pointer">
                        <Typography className="text-center">
                          {item.quantity}
                        </Typography>
                      </div>
                      <div
                        className="p-8 w-full cursor-pointer"
                        onClick={() => {
                          dispatch(decrementCartQuantity(item.id));
                          dispatch(updateCartSubtotal());
                          dispatch(updateCartTotal());
                          dispatch(updateCartWeight());
                        }}
                      >
                        <Typography className="text-center">-</Typography>
                      </div>
                    </div>
                  </Typography>
                </div>
                <div className="flex w-full justify-between p-8">
                  <Typography className=" uppercase text-center font-bold">
                    Subtotal:
                  </Typography>
                  <Typography className="  text-center" color="text.secondary">
                    {item.subtotal}
                    {/* {item.quantity * item.price} */}
                  </Typography>
                </div>
              </div>
            </>
          ))}
          <div>
            <form
              name="loginForm"
              noValidate
              className="flex items-center justify-center md:w-1/2 mt-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="coupon"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-8"
                    label="Coupon Code"
                    autoFocus
                    type="text"
                    error={!!errors.coupon}
                    helperText={errors?.coupon?.message}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter coupon code"
                    size="small"
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className=" mx-16 w-full my-56"
                aria-label="Sign in"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
                style={{ borderRadius: "8px" }}
              >
                Apply Coupon
              </Button>
            </form>{" "}
          </div>
          <div className="">
            <CartTotals />
          </div>
        </div>
      )}
    </div>
  );
};
