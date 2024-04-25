import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postReview } from "app/store/homeSlice";
import { Headings } from "../../home/Headings";

const defaultValues = {
  name: "",
  email: "",
  comment: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a value"),
  email: yup
    .string()
    .required("You must enter a value")
    .email("Please enter valid email"),
  comment: yup.string().required("You must enter a value"),
});

function ProductReview() {
  const dispatch = useDispatch();
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { id } = useParams();

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  return (
    <div className="  w-full  justify-start items-start">
      <Headings
        heading={"Write a Review"}
        subheading={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        }
      />
      <form
        // className="w-full flex flex-col justify-center items-center"
        className="w-full md:w-1/2"
        onSubmit={handleSubmit((_data) => {
          console.info(_data);
          dispatch(postReview({ ..._data, productId: id })).then(() =>
            reset(defaultValues)
          );
        })}
      >
        <div className="mt-48 mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors?.name?.message}
                required
                fullWidth
              />
            )}
            name="name"
            control={control}
          />
        </div>
        <div className=" mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors?.email?.message}
                required
                fullWidth
                type="email"
              />
            )}
            name="email"
            control={control}
          />
        </div>
        <div className=" mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Comment"
                variant="outlined"
                error={!!errors.comment}
                helperText={errors?.comment?.message}
                required
                fullWidth
                multiline
                rows={5}
              />
            )}
            name="comment"
            control={control}
          />
        </div>

        <div className="flex my-48 items-center">
          <Button
            className="px-16 single-product-button"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Post Review
          </Button>

          <Button
            className="mx-8"
            type="button"
            onClick={() => {
              reset(defaultValues);
            }}
          >
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProductReview;
