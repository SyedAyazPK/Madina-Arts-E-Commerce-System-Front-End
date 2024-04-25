import { Divider, Typography } from "@mui/material";

export const BusinessProfileCard = () => {
  return (
    <div>
      <Typography className="mb-16 font-semibold w-full">
        Existing Business Profile
      </Typography>
      <div className="p-16 bg-[#F8C51B]">
        <Typography
          className="font-semibold text-lg pb-8"
          style={{ color: "#009052" }}
        >
          ZU GALORA (8009-82708)
        </Typography>
        <Divider style={{ color: "#009052" }} />
        <div className="py-24">
          <div className="w-full flex items-centre">
            <Typography className="font-semibold mr-8">Phone:</Typography>
            <Typography> 0321768643</Typography>
          </div>
          <div className="w-full flex items-centre mt-8">
            <Typography className="font-semibold mr-8">Email:</Typography>
            <Typography> Hi@gmail.com</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
