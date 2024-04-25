import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
  selectBrandsForFilter,
  selectCategories,
  selectCategoriesForFilter,
} from "app/store/homeSlice";
import { productFilters } from "app/store/homeSlice";

let renderCount = 0;

const options = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
];

const defaultValues = {};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

function ShopFilters() {
  const dispatch = useDispatch();
  const categoriesForFilters = useSelector(selectCategoriesForFilter);
  const brandsForFilters = useSelector(selectBrandsForFilter);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  renderCount += 1;

  const onSubmit = (data) => {
    console.log(data);
    const Categories = data.Categories?.map((category) => category._id);
    const Brands = data.Brands?.map((brand) => brand._id);
    console.log(Categories, "Categories");
    dispatch(productFilters({ brand: Brands, category: Categories }));
  };
  let catIds = [1, 2];

  const [state, setState] = useState(
    catIds.reduce((a, v) => ({ ...a, [v]: false }), {})
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch, state]);

  const handleChange = async (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const defaultNames = ["bill", "Manos"];

  const [checkedValues, setCheckedValues] = useState(defaultNames);

  return (
    <div className="flex w-full md:pr-40 justify-start items-start">
      <form
        className="w-full"
        onSubmit={handleSubmit((_data) => {
          console.info(_data);
        })}
      >
        <div className="flex justify-between my-8 items-center">
          <Typography>Filters</Typography>
          <Button
            className=""
            type="button"
            onClick={() => {
              reset(defaultValues);
            }}
          >
            <small>Clear Filters</small>
          </Button>
        </div>
        <div className="mt-8 mb-16">
          {/* <div className="mt-8 mb-16">
            <Typography className="mb-24 font-medium text-14">
              Categories
            </Typography>
            <Controller
              name="Categories"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Autocomplete
                  className="mt-8 mb-16"
                  multiple
                  freeSolo
                  options={categoriesForFilters}
                  getOptionLabel={(option) => option.title}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                    console.log(
                      newValue.map((a) => a._id),
                      "newValue"
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select multiple tags"
                      label="Tags"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors.Autocomplete}
                      helperText={errors?.Autocomplete?.message}
                      onBlur={onBlur}
                      inputRef={ref}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div> */}
          {/* <div className='mt-24 mb-16'>
            <Typography className='mb-24 font-medium text-14'>
              Colors
            </Typography>
            <Controller
              name='Colors'
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Autocomplete
                  className='mt-8 mb-16'
                  multiple
                  freeSolo
                  options={options}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder='Select multiple tags'
                      label='Tags'
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors.Autocomplete}
                      helperText={errors?.Autocomplete?.message}
                      onBlur={onBlur}
                      inputRef={ref}
                    />
                  )}
                />
              )}
            />
          </div> */}
          <div className="mt-24 mb-16">
            <Typography className="mb-24 font-medium text-14">
              Brands
            </Typography>
            <Controller
              name="Brands"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, id, onBlur, ref } }) => (
                <Autocomplete
                  className="mt-8 mb-16"
                  multiple
                  freeSolo
                  options={brandsForFilters}
                  getOptionLabel={(option) => option.title}
                  value={id}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select multiple tags"
                      label="Tags"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors.Autocomplete}
                      helperText={errors?.Autocomplete?.message}
                      onBlur={onBlur}
                      inputRef={ref}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div>
          {/* <div className="mt-24 mb-16">
            <Typography className="mb-24 font-medium text-14">
              Ratings
            </Typography>
            <Controller
              name="Ratings"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value, onBlur, ref } }) => (
                <Autocomplete
                  className="mt-8 mb-16"
                  multiple
                  freeSolo
                  options={options}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select multiple tags"
                      label="Tags"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!errors.Autocomplete}
                      helperText={errors?.Autocomplete?.message}
                      onBlur={onBlur}
                      inputRef={ref}
                      size="small"
                    />
                  )}
                />
              )}
            />
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default ShopFilters;
