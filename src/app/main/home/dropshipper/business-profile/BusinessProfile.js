import { Typography } from "@mui/material";
import { BusinessProfileCard } from "./BusinessProfileCard";
import { Description } from "./Description";
import BusinessProfileForm from "./BusinessProfileForm";

export const BusinessProfile = () => {
  return (
    <div>
      <Description />
      <div className="mt-16 md:flex justify-between w-full">
        <div className="w-full">
          <BusinessProfileForm />
        </div>
        <div className="w-full md:ml-16">
          <BusinessProfileCard />
        </div>
      </div>
    </div>
  );
};
