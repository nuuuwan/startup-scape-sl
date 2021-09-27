import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";

const URL_STARTUPSL_LK = "https://www.startupsl.lk/";
const URL_NUUUWAN = "https://twitter.com/nuuuwan";

export default function BottomNavigationCustom({ homePage }) {
  function onChangeBottomNavigation(event, newValue) {
    switch (newValue) {
      case "twitter":
        window.open(URL_NUUUWAN);
        break;
      case "website":
        window.open(URL_STARTUPSL_LK);
        break;
      case "terms":
        homePage.setState({ showTermsDialog: true });
        break;
      case "download":
        homePage.onClickDownload();
        break;
      case "filter":
        homePage.onToggleFilter();
        break;
      default:
        break;
    }
  }

  return (
    <BottomNavigation showLabels value={""} onChange={onChangeBottomNavigation}>
      <BottomNavigationAction
        label="vis by @nuuuwan"
        value="twitter"
        icon={<TwitterIcon />}
      />
      <BottomNavigationAction
        label="data from startups.lk"
        value="website"
        icon={<LanguageIcon />}
      />
      <BottomNavigationAction
        label="Terms"
        value="terms"
        icon={<GavelIcon />}
      />
      <BottomNavigationAction
        label="Download"
        value="download"
        icon={<CloudDownloadIcon />}
      />
      <BottomNavigationAction
        label="Filter"
        value="filter"
        icon={<FilterAltIcon />}
      />
    </BottomNavigation>
  );
}
