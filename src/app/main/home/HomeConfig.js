import Home from "./Home";
import TrackOrder from "./TrackOrder";

const HomeConfig = {
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
      path: "/",
      element: <Home />,
    },
    {
      path: "/track-order",
      element: <TrackOrder />,
    },
  ],
};

export default HomeConfig;
