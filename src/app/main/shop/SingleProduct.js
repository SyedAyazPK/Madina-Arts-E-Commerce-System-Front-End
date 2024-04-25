import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  selectCart,
  selectCartSubtotal,
  selectQuantity,
  updateCart,
  updateCartSubtotal,
  updateCartTotal,
  updateCartWeight,
} from "app/store/shopSlice";
import { useParams } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";
import {
  getProductByVariation,
  getSingleProduct,
  selectSingleProduct,
} from "app/store/homeSlice";
import { TopSellers } from "../home/top-sellers/TopSellers";
import ProductReview from "./products/ProductReview";

const images = [
  "assets/images/seeds/pesticide.jpg",
  "assets/images/seeds/arshad5c.webp",
  "assets/images/seeds/IMG_1226.jpg",
  "assets/images/seeds/seed_fsf.jpg",
];

export const SingleProduct = () => {
  const singleProduct = useSelector(selectSingleProduct);
  console.log(
    "🚀 ~ file: SingleProduct.js:40 ~ SingleProduct ~ singleProduct:",
    singleProduct
  );
  const dispatch = useDispatch();
  const quantity = useSelector(selectQuantity);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const cart = useSelector(selectCart);
  const { id } = useParams();
  const [alignment, setAlignment] = useState("");

  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (singleProduct.type === "Variable") {
      const variationIds = singleProduct.variations?.map(
        (variation) => variation._id
      );
      dispatch(getProductByVariation({ variationIds }));
    }
  }, [singleProduct]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [image, setImage] = useState("assets/images/seeds/seed_fsf.jpg");
  return (
    <div className="my-24 md:px-80 px-32">
      <div className="md:flex w-full md:space-x-32">
        <div className="md:w-1/2">
          <img
            src={
              singleProduct.type === "Variable"
                ? singleProduct.variations?.[0].images?.[0]
                : singleProduct.images?.[0]
            }
            className="mb-16 flex"
            style={{ maxHeight: "48rem" }}
          />
          {/* <div className='flex w-full space-x-4'>
            {images.map((image, index) => (
              <img
                src={singleProduct?.image[0]}
                key={index}
                width={100}
                height={100}
                onClick={() => setImage(image)}
                className='cursor-pointer'
              />
            ))}
          </div> */}

          <div className="my-16">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="font-bold">Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{singleProduct?.description}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="font-bold">Care Instructions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="font-bold">
                  Shipping & Return Policy
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="md:w-1/2">
          <Typography className="single-product-title">
            {singleProduct?.title}
            <Typography>
              SKU: {singleProduct?.productSku}
              <br />
              Categories: {singleProduct?.category?.title},{" "}
              {singleProduct?.brand?.title}
            </Typography>
          </Typography>
          {singleProduct?.discountedPrice ? (
            <div className="my-8 flex  ">
              <Typography
                className="single-product-price my-8 mr-16"
                style={{ textDecoration: "line-through" }}
              >
                {singleProduct.price} PKR
              </Typography>
              <Typography className="single-product-discounted-price my-8">
                {singleProduct.discountedPrice} PKR
              </Typography>
            </div>
          ) : (
            <Typography className="single-product-price my-8">
              Rs. {singleProduct?.price}
            </Typography>
          )}

          {/* {singleProduct?.attribute ? (
            <div className="my-8">
              <Typography className="font-semibold text-16">
                {singleProduct?.attribute?.title} :{" "}
                {singleProduct?.attribute?.description}
              </Typography>
            </div>
          ) : (
            ""
          )} */}
          {singleProduct?.type !== "Simple" && (
            <>
              <Typography>Options</Typography>
              <div className="flex items-center space-x-4 my-16">
                <ToggleButtonGroup
                  color="secondary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  orientation="vertical"
                >
                  {singleProduct?.variations?.map((variation, index) => (
                    <ToggleButton value={variation._id} size="small">
                      {variation._id}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
            </>
          )}

          <List
            sx={{
              listStyleType: "disc",
              pl: 1,
              "& .MuiListItem-root": {
                display: "list-item",
              },
            }}
          >
            <ListItem>
              <Typography>
                {singleProduct?.type === "Variable"
                  ? singleProduct?.variations?.[0]?.description
                  : singleProduct?.description}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                {singleProduct?.type === "Variable"
                  ? singleProduct?.variations?.[0]?.shortDescription
                  : singleProduct?.shortDescription}
              </Typography>
            </ListItem>
          </List>
          <div className="flex w-full items-center space-x-16">
            <div className="border-1 flex" style={{ borderRadius: "5px" }}>
              <div
                className="border-r-1 p-8 px-16 cursor-pointer"
                onClick={() => {
                  dispatch(decrementQuantity());
                }}
              >
                <Typography>-</Typography>
              </div>
              <div className="border-r-1 p-8 px-16 cursor-pointer">
                <Typography>{quantity}</Typography>
              </div>
              <div
                className="p-8 px-16 cursor-pointer"
                onClick={() => {
                  dispatch(incrementQuantity());
                }}
              >
                +
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="px-16 single-product-button"
              disabled={quantity < 1}
              onClick={() => {
                dispatch(
                  updateCartSubtotal(
                    singleProduct?.discountedPrice
                      ? quantity * singleProduct.discountedPrice
                      : quantity * singleProduct.price
                  )
                );
                dispatch(
                  updateCart({
                    id: id,
                    quantity: quantity,
                    price: singleProduct?.discountedPrice
                      ? singleProduct?.discountedPrice
                      : singleProduct?.price,
                    title: singleProduct?.title,
                    image: singleProduct.images[0],
                    subtotal: singleProduct?.discountedPrice
                      ? quantity * singleProduct.discountedPrice
                      : quantity * singleProduct.price,
                    product: id,
                    sellPrice: singleProduct?.discountedPrice
                      ? singleProduct?.discountedPrice
                      : singleProduct?.price,
                    actualWeight: singleProduct?.weight
                      ? singleProduct?.weight
                      : 0,
                    weight: singleProduct?.weight
                      ? singleProduct?.weight * quantity
                      : 0,
                    selectedVariation:
                      singleProduct.type === "Variable" ? alignment : null,
                  })
                );
                dispatch(
                  showMessage({ message: "Cart updated", variant: "success" })
                );
                dispatch(updateCartTotal());
                dispatch(updateCartWeight());
                window.scrollTo(0, 0);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <ProductReview />
      <TopSellers />
    </div>
  );
};
