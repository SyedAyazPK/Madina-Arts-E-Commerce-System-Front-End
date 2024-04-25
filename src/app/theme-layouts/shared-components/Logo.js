import { Hidden } from "@mui/material";
import { styled } from "@mui/material/styles";
import History from "src/@history/@history";

const Root = styled("div")(({ theme }) => ({
  "& > .logo-icon": {
    transition: theme.transitions.create(["width", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  "& > .badge": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root
      className="flex items-center cursor-pointer"
      onClick={() => History.push("/")}
    >
      <Hidden lgDown>
        <img
          className="logo-icon"
          src="assets/images/logo/logo.png"
          alt="logo"
          width={150}
          height={150}
        />
      </Hidden>
      <Hidden lgUp>
        <img
          className="logo-icon"
          src="assets/images/logo/logo.png"
          alt="logo"
          width={150}
          height={150}
        />
      </Hidden>
    </Root>
  );
}

export default Logo;
