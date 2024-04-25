import { Grid } from "@mui/material";
import { selectBrands } from "app/store/homeSlice";
import { useSelector } from "react-redux";
import { Headings } from "../Headings";
import { BrandCard } from "./BrandCard";

export const Brands = () => {
  const brands = useSelector(selectBrands);
  return (
    <div>
      <Headings
        heading={"Shop by brand"}
        subheading={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        }
      />
      <Grid container spacing={2}>
        {brands?.map((brand, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <BrandCard
              image={brand.image}
              title={brand.title}
              subtitle={brand.description}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
