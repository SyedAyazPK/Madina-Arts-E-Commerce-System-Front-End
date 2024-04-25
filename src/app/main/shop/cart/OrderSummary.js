import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import {
  selectCart,
  selectCheckout,
  selectOrderSummary,
} from "app/store/shopSlice";
import { selectUser } from "app/store/userSlice";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup.object().shape({
  fname: yup.string().required("You must enter a value"),
  lname: yup.string().required("You must enter a value"),
  street: yup.string().required("You must enter a value"),
  city: yup.string().required("You must enter a value"),
  province: yup.string().required("You must enter a value"),
  zip: yup.string().required("You must enter a value"),
  phone: yup.string().required("You must enter a value"),
  email: yup.string().required("You must enter a value"),
});

const defaultValues = {
  zip: "",
  city: "",
  country: "pk",
  province: "punjab",
};

export const OrderSummary = () => {
  const cart = useSelector(selectOrderSummary);
  const checkout = useSelector(selectCheckout);
  const user = useSelector(selectUser);

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    console.log("coupon", data);
  }

  function printFunction() {
    window.print();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" p-16 md:px-80">
      <div className="flex justify-between items-center">
        <Typography variant="h5" className="my-24 w-full flex">
          Checkout
        </Typography>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={() => printFunction()}
          className="flex justify-end"
        >
          Print
        </Button> */}
      </div>

      <Typography className="  font-bold">
        Thank you! Your order has been received
      </Typography>
      <div className="md:flex w-full items-center">
        <div className="w-full p-8 border-r-1">
          <Typography className=" uppercase">order number</Typography>
          <Typography className="  font-bold">{checkout?.orderId}</Typography>
        </div>
        <div className="w-full p-8 border-r-1">
          <Typography className=" uppercase">date</Typography>
          <Typography className="  font-bold">
            {moment(checkout?.createdAt).format("MMMM DD, YYYY")}
          </Typography>
        </div>
        <div className="w-full p-8 border-r-1">
          <Typography className=" uppercase">email</Typography>
          <Typography className="  font-bold">{checkout?.email}</Typography>
        </div>
        <div className="w-full p-8 border-r-1">
          <Typography className=" uppercase">total</Typography>
          <Typography className="  font-bold" color="text.secondary">
            Rs {checkout?.totalPrice}
          </Typography>
        </div>
        <div className="w-full p-8 border-r-1">
          <Typography className=" uppercase">payment method</Typography>
          <Typography className="  font-bold">{checkout?.method}</Typography>
        </div>
      </div>
      <Typography className="  font-bold">
        Pay with cash upon delivery.
      </Typography>

      <Typography variant="h5" className="my-24">
        Order Details
      </Typography>
      <div className="border-1 w-full">
        <div className="flex justify-between w-full border-b-1">
          <Typography className="w-full uppercase font-bold border-r-1 p-8">
            product
          </Typography>
          <Typography className=" uppercase font-bold w-full p-8">
            subtotal
          </Typography>
        </div>
        {cart.map((item) => (
          <div className="  flex w-full justify-between border-b-1">
            <Typography
              className="w-full border-r-1 p-8 underline"
              color="text.secondary"
            >
              {item.title} x {item.quantity}
            </Typography>{" "}
            <Typography className="w-full p-8" color="text.secondary">
              Rs{" "}
              {user.role === "DropShipper"
                ? item.quantity * item.sellPrice
                : item.quantity * item.price}
            </Typography>{" "}
          </div>
        ))}
        <div className="  flex w-full justify-between border-b-1">
          <Typography className="w-full uppercase font-bold border-r-1 p-8">
            subtotal
          </Typography>
          <Typography className="w-full  p-8" color="text.secondary">
            Rs {checkout?.totalPrice}
          </Typography>{" "}
        </div>
        {/* <div className='  flex w-full justify-between border-b-1'>
          <Typography className='w-full uppercase font-bold border-r-1 p-8'>
            shipping
          </Typography>
          <Typography className='w-full  p-8' color='text.secondary'>
            Rs 450.00 via Cash on Delivery
          </Typography>{' '}
        </div> */}
        <div className=" flex w-full justify-between border-b-1">
          <Typography className="w-full uppercase font-bold border-r-1 p-8">
            payment method
          </Typography>
          <Typography className="w-full  p-8" color="text.secondary">
            {checkout?.method}
          </Typography>{" "}
        </div>
        <div className="  flex w-full justify-between border-b-1">
          <Typography className="w-full uppercase font-bold border-r-1 p-8">
            total
          </Typography>
          <Typography className="w-full p-8" color="text.secondary">
            Rs {checkout?.totalPrice}
          </Typography>{" "}
        </div>
        <div className="  flex w-full justify-between">
          <Typography className="w-full uppercase font-bold border-r-1  p-8">
            note
          </Typography>
          <Typography className="w-full p-8" color="text.secondary">
            {checkout?.note}
          </Typography>{" "}
        </div>
      </div>
      <Typography variant="h5" className="my-24">
        Billing Address
      </Typography>
      <div className="border-1 p-8">
        <Typography>{checkout?.fname + " " + checkout?.lname}</Typography>
        <Typography>{checkout?.street}</Typography>
        <Typography>{checkout?.city}</Typography>
        <Typography>{checkout?.province}</Typography>
        <Typography>{checkout?.zip}</Typography>
        <Typography>{checkout?.phone}</Typography>
        <Typography>{checkout?.email}</Typography>
      </div>
    </div>
  );
};
