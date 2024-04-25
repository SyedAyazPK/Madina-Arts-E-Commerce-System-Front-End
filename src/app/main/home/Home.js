import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import DemoContent from "@fuse/core/DemoContent";
import { Button, Typography } from "@mui/material";
import { Banner } from "./Banner";
import { Categories } from "./categories/Categories";
import { Brands } from "./brands/Brands";
import { TopSellers } from "./top-sellers/TopSellers";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBrands, getCategories } from "app/store/homeSlice";
import { selectUser } from "app/store/userSlice";
import DropShipper from "./dropshipper/DropShipper";

function HomePage(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);
  return (
    <div>
      {user.role !== "DropShipper" ? (
        <>
          {" "}
          <Banner />
          <div className="md:mx-80 mx-24">
            <Categories />
            <Brands />
            <TopSellers />
            <div className="my-24"></div>
          </div>
          <div className=" ">
            <Footer />
          </div>
        </>
      ) : (
        <div>
          <DropShipper />
        </div>
      )}
    </div>
  );
}

export default HomePage;
