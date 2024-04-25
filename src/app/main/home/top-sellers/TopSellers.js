import { Grid, Paper } from "@mui/material";
import { getProducts, selectProducts } from "app/store/homeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Headings } from "../Headings";
import { TopSellerCard } from "./TopSellerCard";

export const TopSellers = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const id = useParams().id;
  useEffect(() => {
    dispatch(getProducts());
  }, [id]);
  return (
    <div>
      <Headings
        heading={"Our Top Sellers"}
        subheading={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        }
      />
      <Grid container spacing={2}>
        {products?.result?.map((product) => (
          <Grid item xs={6} md={4} lg={3}>
            <Paper
              elevation={1}
              sx={{ p: 1, height: "100%", justifyContent: "center" }}
            >
              <TopSellerCard
                image={product.images}
                title={product.title}
                subtitle={product.shortDescription}
                id={product._id}
                product={product}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
