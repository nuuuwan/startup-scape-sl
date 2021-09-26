import Startups from "../../core/Startups.js";
import "./StartupInfo.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CategoryIcon from "@mui/icons-material/Category";
import Chip from "@mui/material/Chip";
import EmailIcon from "@mui/icons-material/Email";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import TimelineIcon from "@mui/icons-material/Timeline";
import Typography from "@mui/material/Typography";

const URL_LINKEDIN_PREFIX =
  "https://www.linkedin.com/search/results/all/?keywords=";

export default function StartupInfo(props) {
  const { startupID } = props;
  if (!startupID) {
    return null;
  }
  const startup = Startups.getStartup(startupID);
  const imageFileOnly = startup["image_file_only"];
  const imgSrc = require("../../assets/images/startup_images/" +
    imageFileOnly).default;

  let url = startup["url"];
  if (!url.toLowerCase().includes("http")) {
    url = "http://" + url;
  }

  const urlLinkedIn =
    URL_LINKEDIN_PREFIX + startup["founder_info"]["name"].replaceAll(" ", "+");

  const chipInfoList = [].concat(
    startup["category_list"].map(function (value) {
      return {
        value: value,
        icon: <CategoryIcon />,
      };
    }),
    [
      {
        value: startup["startup_stage"],
        icon: <TimelineIcon />,
      },
      {
        value: startup["funding_stage"],
        icon: <MonetizationOnIcon />,
      },
    ]
  );

  return (
    <div className="div-startup-info">
      <Box sx={{ padding: 2 }}>
        <img className="img-startup-info" src={imgSrc} alt={startup["name"]} />

        <Typography variant="h4" gutterBottom>
          {startup["name"]}
        </Typography>

        <Typography variant="h6" gutterBottom>
          "{startup["tagline"]}"
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {chipInfoList.map(function ({ value, icon }) {
            return <Chip key={value} label={value} icon={icon} />;
          })}
        </Box>

        <Typography variant="body1" gutterBottom>
          {startup["description"]}
        </Typography>

        <Card sx={{ maxWidth: 345 }}>
          <MenuList>
            {startup["founder_info"]["name"] ? (
            <MenuItem>
              <ListItemIcon>
                <LinkedInIcon fontSize="small" />
              </ListItemIcon>
              <Link href={urlLinkedIn} underline="none">
                {startup["founder_info"]["name"]}
              </Link>
            </MenuItem>
            ) : null}

            {startup["founder_info"]["email"] ? (
            <MenuItem>
              <ListItemIcon>
                <EmailIcon fontSize="small" />
              </ListItemIcon>
              <Link
                href={"mailto:" + startup["founder_info"]["email"]}
                underline="none"
              >
                {startup["founder_info"]["email"]}
              </Link>
            </MenuItem>
            ) : null}

            {startup["founder_info"]["phone"] ? (
              <MenuItem>
                <ListItemIcon>
                  <PhoneIcon fontSize="small" />
                </ListItemIcon>
                <Link
                  href={"tel:" + startup["founder_info"]["phone"]}
                  underline="none"
                >
                  {startup["founder_info"]["phone"]}
                </Link>
              </MenuItem>
            ) : null}
          </MenuList>
        </Card>

        <Typography variant="overline" display="block">
          Registration {startup["business_registration_date"]}
        </Typography>
      </Box>
    </div>
  );
}
