import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import History from "@history";
import { Typography } from "@mui/material";

export const ShopCard = ({
  id,
  image,
  title,
  subtitle,
  price,
  reviews,
  product,
}) => {
  return (
    <div
      className="cursor-pointer   h-full"
      onClick={() =>
        product.type === "Simple"
          ? History.push(`/shop/product/${id}`)
          : History.push(
              `/shop/product/variable/${id}/variations/${product.variationIds.join(
                ","
              )}`
            )
      }
    >
      <div className="category-card-border top-seller-container h-full">
        <img
          src={
            product.type === "Variable"
              ? product.variations?.[0].images?.[0]
              : product.images?.[0]
          }
          className="p-8"
        />
        <div className="">
          <FuseSvgIcon
            className="text-48 top-seller-icon-position rounded-full p-8"
            size={32}
            color="action"
            style={{ backgroundColor: "white" }}
          >
            heroicons-outline:shopping-cart
          </FuseSvgIcon>
        </div>
        <div className="px-16 mb-16 pb-64">
          <Typography className="my-8 shop-card-title">{title}</Typography>
          <Typography className="my-8  sub-heading">{subtitle}</Typography>
          {product?.attribute ? (
            <div className="my-8">
              <Typography className="font-semibold text-16">
                {product?.attribute?.title} : {product?.attribute?.description}
              </Typography>
            </div>
          ) : (
            ""
          )}
        </div>
        {product.type === "Variable" && (
          <Typography
            className="my-16 pb-16 px-16 shop-card-price"
            style={{ position: "absolute", bottom: "0px" }}
          >
            {product.lowestPrice} - {product.highestPrice} PKR
          </Typography>
        )}
        {product.discountedPrice ? (
          <div
            className="my-16 flex px-16  w-full"
            style={{ position: "absolute", bottom: "0px" }}
          >
            <Typography
              className="mt-16 pb-16 shop-card-price mr-16"
              style={{ textDecoration: "line-through" }}
            >
              {price} PKR
            </Typography>
            <Typography className="mt-16 pb-16 shop-card-price">
              {product.discountedPrice} PKR
            </Typography>
          </div>
        ) : (
          <Typography
            className="my-16 pb-16 px-16 shop-card-price"
            style={{ position: "absolute", bottom: "0px" }}
          >
            {product.type !== "Variable" && `${product.price} PKR`}
          </Typography>
        )}
      </div>
    </div>
  );
};
