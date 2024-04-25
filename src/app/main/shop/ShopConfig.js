import { Cart } from "./cart/Cart";
import { Checkout } from "./cart/Checkout";
import { OrderSummary } from "./cart/OrderSummary";
import ShopPage from "./Shop";
import { SingleProduct } from "./SingleProduct";
import { LaunchApp } from "./Test";
import { VariableProduct } from "./VariableProduct";

const ShopConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: "/shop/category/:id",
      element: <ShopPage />,
    },
    {
      path: "shop/product/:id",
      element: <SingleProduct />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/order-summary",
      element: <OrderSummary />,
    },
    {
      path: "/shop/product/variable/:id/variations/:variations",
      element: <VariableProduct />,
    },
  ],
};

export default ShopConfig;
