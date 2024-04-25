import History from "@history";
import {
  FacebookOutlined,
  LinkedIn,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { selectNav } from "app/store/homeSlice";
import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const categories = useSelector(selectNav);
  const footerUperLayout = [
    {
      logo: (
        <img src={"assets/images/logo/logo.png"} width={100} height={100} />
      ),
      // content: [{ title: "Karachi Pakistan" }],
      socialLinks: [
        <FacebookOutlined />,
        <Twitter />,
        <LinkedIn />,
        <Pinterest />,
      ],
    },
    {
      content: categories.map((category) => category),
    },
    // {
    //   content: [
    //     { title: "About" },
    //     { title: "Madina Arts" },
    //     { title: "Parkins" },
    //   ],
    // },
    // {
    //   content: [
    //     { title: "Help" },
    //     { title: "Help Center" },
    //     { title: "Return Policy" },
    //     { title: "Refund" },
    //   ],
    // },
  ];
  // const lowerLayout = [
  //   {
  //     name: "Developed by NaxTech",
  //   },
  //   {
  //     name: ["Pricacy Policy", "Terms & Conditions", "Cookies"],
  //   },
  //   {
  //     name: "Scroll To Top",
  //   },
  // ];

  return (
    <>
      <Box
        paddingTop="6rem"
        className="grid grid-cols-2 md:grid-cols-4 gap-8  px-16 md:pl-128"
        sx={{ backgroundColor: "#dff8e2" }}
      >
        {footerUperLayout.map((item, index) => {
          var parentIndex = index;
          return (
            <Box
              className="w-full md:pl-16"
              key={index}
              display="flex"
              flexDirection="column"
            >
              <Typography
                variant="h2"
                component="h6"
                sx={!item?.logo && { display: "none" }}
                className=" "
              >
                {item.logo}
              </Typography>
              {item?.content?.map((item, index) => {
                const itemWidth = item?.length;
                return (
                  <Box key={index} sx={index === 0 && { marginBottom: 1 }}>
                    <Typography
                      // variant='subtitle1'
                      fontWeight={500}
                      // fontSize={14}
                      className={`!w-[${itemWidth}ch] `}
                      onClick={() => History.push(`/shop/category/${item.id}`)}
                      sx={
                        parentIndex === 0
                          ? {
                              py: 6,
                            }
                          : {
                              justifyContent: "center",
                              cursor: "pointer",
                              my: 0.3,
                              "&:hover": {
                                transition: "all 0.5s ease-in-out",
                                pb: 0.3,
                                color: "#009052",
                              },
                            }
                      }
                    >
                      {item.title}{" "}
                    </Typography>
                  </Box>
                );
              })}
              <Box
                width="100%"
                paddingY="2rem"
                display="flex"
                alignItems="center"
                // justifyContent="space-between"
              >
                {item?.socialLinks?.map((link, index) => {
                  const colorGeneratorByIndex = () => {
                    let color;
                    if (index === 0) {
                      color = "#199de0";
                    } else if (index === 1) {
                      color = "#0bbe70";
                    } else if (index === 2) {
                      color = "#0bbe70";
                    } else {
                      color = "#199de0";
                    }
                    return color;
                  };
                  return (
                    <Box
                      borderRadius="100%"
                      sx={{
                        backgroundColor: colorGeneratorByIndex(),
                      }}
                      justifyContent="center"
                      color="white"
                      display="flex"
                      alignItems="center"
                      padding="5px 5px"
                      key={index}
                      className="mr-2"
                    >
                      {link}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* <Box
        className="flex items-center justify-center sm:flex-row flex-col sm:space-y-0 space-y-3 sm:justify-around py-16"
        sx={{ backgroundColor: "#dff8e2" }}
      >
        {lowerLayout?.map(({ name }, index) => {
          return (
            <Box key={index}>
              {Array.isArray(name) ? (
                <div className="flex items-center">
                  {name?.map((item, index) => {
                    return (
                      <Typography
                        key={index}
                        // variant='subtitle1'
                        // fontSize={14}
                        fontWeight={500}
                        className="transition-colors cursor-pointer hover:text-[#199de0] mx-16"
                        onClick={() => History.push("/test")}
                      >
                        {item}{" "}
                      </Typography>
                    );
                  })}
                </div>
              ) : (
                <Typography
                  // variant='subtitle1'
                  // fontSize={14}
                  fontWeight={500}
                  className="cursor-pointer"
                  onClick={() =>
                    name === "Scroll To Top" ? window.scrollTo(0, 0) : undefined
                  }
                >
                  {name}{" "}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box> */}
    </>
  );
};

export default Footer;
