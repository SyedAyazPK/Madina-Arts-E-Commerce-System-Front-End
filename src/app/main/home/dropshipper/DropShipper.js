import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ProfitReport } from "./ProfitReport";
import { Orders } from "./orders/Order";
import { BusinessProfile } from "./business-profile/BusinessProfile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DropShipper() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        // flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
      className="px-80 py-32"
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: "divider", minWidth: "180px" }}
      >
        <Tab label="Order/Profit Report" {...a11yProps(0)} />
        <Tab label="Order History" {...a11yProps(1)} />
        <Tab label="RCP" {...a11yProps(2)} />
        <Tab label="Business Profile" {...a11yProps(3)} />
        <Tab label="FAQs" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProfitReport />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Orders />
      </TabPanel>
      <TabPanel value={value} index={2}>
        RCP
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BusinessProfile />
      </TabPanel>
      <TabPanel value={value} index={4}>
        FAQs
      </TabPanel>
    </Box>
  );
}
