import { Typography } from "@mui/material";

export const ProfitCard = ({ heading, content }) => {
  return (
    <div className="rounded-md p-40 border-1 text-center">
      <Typography className="font-semibold text-xl">
        {content === "Total Orders" || content === "Received Orders"
          ? heading
          : heading
          ? `Rs. ${heading}/-`
          : `---`}
      </Typography>
      <Typography className="">{content}</Typography>
    </div>
  );
};
