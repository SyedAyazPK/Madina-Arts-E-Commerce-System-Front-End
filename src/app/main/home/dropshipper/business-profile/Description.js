import { Typography } from "@mui/material";

export const Description = () => {
  return (
    <div>
      <div className="flex w-full">
        <div className="bullet rounded-full mr-8 mt-6"></div>
        <Typography>
          Please provide details of your business where you are dropshipping the
          available products whether it is a website, social media pages,
          profiles or any other platform.
        </Typography>
      </div>
      <div className="flex w-full mt-8">
        <div className="bullet rounded-full mr-8 mt-6"></div>
        <Typography>
          Contact number should be the same as available to your customer on
          your website/business.
        </Typography>
      </div>
      <div className="flex w-full mt-8">
        <div className="bullet rounded-full mr-8 mt-6"></div>
        <Typography>
          your customer support number should be active and available clearly to
          the customers
        </Typography>
      </div>
      <div className="flex w-full mt-8">
        <div className="bullet rounded-full mr-8 mt-6"></div>
        <Typography>
          For testing purpose we can place a test order on your business to
          check your availability of your support number and response timings,
          in case of non serious attitude or no response within 1 working day,
          your account will be banned without any notice.
        </Typography>
      </div>
      <div className="flex w-full mt-8">
        <div className="bullet rounded-full mr-8 mt-6"></div>
        <Typography>
          Please call or message your customers to confirm the orders before
          forwarding them to HHC Dropshipping, in case of excessive fake orders
          and returns, your account will be at risk.
        </Typography>
      </div>
    </div>
  );
};
