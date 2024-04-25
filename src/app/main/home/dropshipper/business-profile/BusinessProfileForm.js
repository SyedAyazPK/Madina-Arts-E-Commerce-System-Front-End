import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import { Typography } from "@mui/material";

const defaultValues = {
  TextField: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  TextField: yup.string().required("You must enter a value"),
});

function BusinessProfileForm() {
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  return (
    <div className="  w-full  ">
      <Typography className="mb-16 font-semibold w-full">
        Add New Business Profile
      </Typography>
      <form
        className="w-full"
        onSubmit={handleSubmit((_data) => console.info(_data))}
      >
        <div className=" mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Business Name"
                variant="outlined"
                error={!!errors.TextField}
                helperText={errors?.TextField?.message}
                required
                fullWidth
                size="small"
              />
            )}
            name="TextField"
            control={control}
          />
        </div>
        <div className=" mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="URL"
                variant="outlined"
                error={!!errors.TextField}
                helperText={errors?.TextField?.message}
                required
                fullWidth
                size="small"
              />
            )}
            name="URL"
            control={control}
          />
        </div>
        <div className=" mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone/WhatsApp"
                variant="outlined"
                error={!!errors.TextField}
                helperText={errors?.TextField?.message}
                required
                fullWidth
                size="small"
              />
            )}
            name="Phone"
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
                error={!!errors.TextField}
                helperText={errors?.TextField?.message}
                required
                fullWidth
                size="small"
              />
            )}
            name="Email"
            control={control}
          />
        </div>

        <div className=" mb-16">
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Set a Default?"
                variant="outlined"
                error={!!errors.TextField}
                helperText={errors?.TextField?.message}
                required
                fullWidth
                size="small"
              />
            )}
            name="Default"
            control={control}
          />
        </div>

        <div className="flex my-32 items-center">
          <Button
            className="mx-8"
            variant="contained"
            color="secondary"
            type="submit"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BusinessProfileForm;
