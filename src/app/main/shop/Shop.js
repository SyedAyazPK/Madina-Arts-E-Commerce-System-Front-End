import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import {
  getProducts,
  getProductsByCategory,
  selectProducts,
  selectProductsByCategory,
} from "app/store/homeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer";
import { TopSellers } from "../home/top-sellers/TopSellers";
import { ShopCard } from "./ShopCard";
import ShopFilters from "./ShopFilters";
import { motion } from "framer-motion";

function ShopPage(props) {
  const products = useSelector(selectProducts);
  const productsByCategory = useSelector(selectProductsByCategory);

  const dispatch = useDispatch();
  const [age, setAge] = useState("");
  const [page, setPage] = useState(1);
  const id = useParams().id;

  useEffect(() => {
    dispatch(getProductsByCategory(id));
    window.scrollTo(0, 0);
  }, [id]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  return (
    <>
      <div className="md:mx-80 mx-24 my-16">
        <div className="md:flex w-full">
          <div className="w-full md:w-1/3">
            <ShopFilters />
          </div>
          <div className="w-full">
            <div className="flex justify-end">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                >
                  <MenuItem value="">
                    <em>Sort By</em>
                  </MenuItem>
                  <MenuItem value={"low"}>Low to Hight</MenuItem>
                  <MenuItem value={"high"}>High to Low</MenuItem>
                </Select>
              </FormControl>
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={page}
                    onChange={handleChangePage}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    size="small"
                  >
                    <MenuItem value={1}>1-15</MenuItem>
                    <MenuItem value={2}>15-30</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {productsByCategory?.result ? (
              <Grid container spacing={2}>
                {productsByCategory?.result?.map((product) => (
                  <Grid item xs={12} md={4} lg={4} key={product._id}>
                    <Paper
                      elevation={1}
                      sx={{ p: 1, height: "100%", justifyContent: "center" }}
                    >
                      <ShopCard
                        image={product.images}
                        title={product.title}
                        subtitle={product.shortDescription}
                        price={product.price}
                        rating={product.rating}
                        id={product._id}
                        product={product}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div className="flex flex-col flex-1 items-center justify-center p-16">
                <div className="w-full max-w-3xl text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                  >
                    <Typography
                      variant="h1"
                      className="mt-48 sm:mt-96 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
                    >
                      No match Found!
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
                      There are no products in this Category.
                    </Typography>
                  </motion.div>

                  <Link className="block font-normal mt-48" to="/">
                    Back to Home
                  </Link>
                </div>
              </div>
            )}

            {/* <TopSellers /> */}
          </div>
        </div>
      </div>
      <div className="  md:px-0">
        <Footer />
      </div>
    </>
  );
}

export default ShopPage;
