import React, { Component } from "react";
import html2canvas from "html2canvas";

import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Drawer from "@mui/material/Drawer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import LanguageIcon from "@mui/icons-material/Language";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Toolbar from "@mui/material/Toolbar";
import TwitterIcon from "@mui/icons-material/Twitter";
import Typography from "@mui/material/Typography";

import { CATEGORIES } from "../../constants/CategoryConstants.js";
import { STARTUP_STAGES } from "../../constants/StartupStageConstants.js";
import { FUNDING_STAGES } from "../../constants/FundingStageConstants.js";
import Startups from "../../core/Startups.js";

import Title from '../../nonstate/atoms/Title.js';
import StartupInfo from "../../nonstate/molecules/StartupInfo.js";
import StartupScape from "../molecules/StartupScape.js";
import FilterPanel from "../molecules/FilterPanel.js";

import "./HomePage.css";

const URL_STARTUPSL_LK = "https://www.startupsl.lk/";
const URL_NUUUWAN = "https://twitter.com/nuuuwan";
// const URL_STARTUPSCAPE = "https://twitter.com/search?q=%23StartupScapeSL&f=top";
const MIN_WINDOW_INNER_WIDTH = 480;
const STARTUPSCAPE_TOP = 40;
const STARTUPSCAPE_BOTTOM = 100;
const STARTUPSCAPE_LEFT = 40;
const STARTUPSCAPE_RIGHT = 50;

function getGenericToIsSelected(values, isSelected) {
  return values.reduce(function (valueToIsSelected, value) {
    valueToIsSelected[value] = isSelected;
    return valueToIsSelected;
  }, {});
}

function getSelected(valueToIsSelected) {
  return Object.entries(valueToIsSelected)
    .filter(([value, isSelected]) => isSelected)
    .map(([value, isSelected]) => value);
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const categoryToIsSelected = getGenericToIsSelected(CATEGORIES, true);
    const startupStageToIsSelected = getGenericToIsSelected(
      STARTUP_STAGES,
      true
    );
    const fundingStageToIsSelected = getGenericToIsSelected(
      FUNDING_STAGES,
      true
    );

    const activeStartupID = undefined;
    this.ref = React.createRef();

    const width = window.innerWidth;
    const rightPanelWidth = 0;
    const showFilterPanel = false;
    const showStartupInfo = false;
    const isDownloading = false;
    const showTermsDialog = false;

    this.state = {
      startupStageToIsSelected,
      fundingStageToIsSelected,
      categoryToIsSelected,
      activeStartupID,
      width,
      rightPanelWidth,
      showFilterPanel,
      showStartupInfo,
      isDownloading,
      showTermsDialog,
    };

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize(e) {
    const width = window.innerWidth;
    this.setState({ width });
  }

  onChangeCategory(categoryToIsSelected) {
    this.setState({ categoryToIsSelected });
  }

  onChangeStartupStage(startupStageToIsSelected) {
    this.setState({ startupStageToIsSelected });
  }

  onChangeFundingStage(fundingStageToIsSelected) {
    this.setState({ fundingStageToIsSelected });
  }

  onClickSelectAllCategories() {
    const categoryToIsSelected = getGenericToIsSelected(CATEGORIES, true);
    this.setState({ categoryToIsSelected });
  }
  onClickUnSelectAllCategories() {
    const categoryToIsSelected = getGenericToIsSelected(CATEGORIES, false);
    this.setState({ categoryToIsSelected });
  }

  onClickImage(startupID) {
    this.setState({ activeStartupID: startupID, showStartupInfo: true });
  }

  onClickStartupInfoHide() {
    this.setState({ activeStartupID: null });
  }

  onClickDownload() {
    this.setState(
      { isDownloading: true },
      function () {
        html2canvas(this.ref.current, {
          allowTaint: true,
          useCORs: true,
          x: STARTUPSCAPE_LEFT,
          y: STARTUPSCAPE_TOP,
          width: window.innerWidth - STARTUPSCAPE_LEFT - STARTUPSCAPE_RIGHT,
          height: window.innerHeight - STARTUPSCAPE_TOP - STARTUPSCAPE_BOTTOM,
          scale: 5,
        }).then((canvas) => {
          const dataURL = canvas.toDataURL("image/svg+xml");
          let a = document.createElement("a");
          a.href = dataURL;
          a.download = "startups_lk.png";
          a.click();
          this.setState({ isDownloading: false });
        });
      }.bind(this)
    );
  }

  onRightPanelMakeVisible() {
    this.setState({ rightPanelWidth: 260 });
  }
  onRightPanelMakeNotVisible() {
    this.setState({ rightPanelWidth: 0 });
  }

  onToggleFilter() {
    this.setState({ showFilterPanel: !this.state.showFilterPanel });
  }

  onCloseStartupPanel() {
    this.setState({ showStartupInfo: false });
  }

  onChangeBottomNavigation(event, newValue) {
    switch (newValue) {
      case "twitter":
        window.open(URL_NUUUWAN);
        break;
      case "website":
        window.open(URL_STARTUPSL_LK);
        break;
      case "terms":
        this.setState({ showTermsDialog: true });
        break;
      case "download":
        this.onClickDownload();
        break;
      case "filter":
        this.onToggleFilter();
        break;
      default:
        break;
    }
  }

  onCloseTermsDialog() {
    this.setState({ showTermsDialog: false });
  }

  renderSubTitle() {
    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
    } = this.state;

    const startups = Startups.getFiltered(
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected
    );

    const n = startups.length;
    const selectedCategories = getSelected(categoryToIsSelected);
    const selectedStartupStages = getSelected(startupStageToIsSelected);
    const selectedFundingStages = getSelected(fundingStageToIsSelected);

    const nCategories = selectedCategories.length;
    const nStartupStages = selectedStartupStages.length;
    const nFundingStages = selectedFundingStages.length;

    let displayCategory = "";
    if (nCategories > 0) {
      if (nCategories === 43) {
        displayCategory = " (all)";
      } else if (nCategories < 10) {
        displayCategory += " (" + selectedCategories.join(", ") + ")";
      }
    }

    let displayStartupStage = "";
    if (nStartupStages > 0) {
      if (nStartupStages === 6) {
        displayStartupStage = " (all)";
      } else {
        displayStartupStage += " (" + selectedStartupStages.join(", ") + ")";
      }
    }

    let displayFundingStage = "";
    if (nFundingStages > 0) {
      if (nFundingStages === 9) {
        displayFundingStage = " (all)";
      } else {
        displayFundingStage += " (" + selectedFundingStages.join(", ") + ")";
      }
    }

    return (
      <Typography variant="body1" align="center" gutterBottom noWrap>
        {`${n} Startups `}
        {` · ${nCategories} categories${displayCategory}`}
        {` · ${nStartupStages} startup stages${displayStartupStage}`}
        {` · ${nFundingStages} funding stages${displayFundingStage}`}
      </Typography>
    );
  }

  renderNotSupported() {
    return (
      <Typography variant="body2" gutterBottom align="center">
        {`This app is not designed for screens less than` +
          ` ${MIN_WINDOW_INNER_WIDTH}px wide.`}
      </Typography>
    );
  }

  render() {
    const isWindowTooSmall = window.innerWidth < MIN_WINDOW_INNER_WIDTH;

    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
      activeStartupID,
      rightPanelWidth,
      showFilterPanel,
      showStartupInfo,
      isDownloading,
      showTermsDialog,
    } = this.state;

    const key = JSON.stringify({
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
    });

    return (
      <div className="div-home-page" ref={this.ref}>
        <Paper
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
          elevation={3}
        >
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Title/ >
              </Typography>
            </Toolbar>
          </AppBar>
        </Paper>

        <Paper
          sx={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            bottom: STARTUPSCAPE_TOP,
            padding: 1,
          }}
          elevation={3}
        >
          {isWindowTooSmall ? (
            this.renderNotSupported()
          ) : (
            <>
              {this.renderSubTitle()}
              <StartupScape
                key={key}
                ref={this.ref}
                categoryToIsSelected={categoryToIsSelected}
                startupStageToIsSelected={startupStageToIsSelected}
                fundingStageToIsSelected={fundingStageToIsSelected}
                onClickImage={this.onClickImage.bind(this)}
                rightPanelWidth={rightPanelWidth}
              />

              <Snackbar
                open={isDownloading}
                autoHideDuration={1000}
                message="Downloading..."
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
              />
            </>
          )}
        </Paper>
        <Drawer
          open={showFilterPanel}
          anchor="right"
          onClose={this.onToggleFilter.bind(this)}
        >
          <FilterPanel
            categoryToIsSelected={categoryToIsSelected}
            startupStageToIsSelected={startupStageToIsSelected}
            fundingStageToIsSelected={fundingStageToIsSelected}
            onChangeCategory={this.onChangeCategory.bind(this)}
            onChangeStartupStage={this.onChangeStartupStage.bind(this)}
            onChangeFundingStage={this.onChangeFundingStage.bind(this)}
            onClickSelectAllCategories={this.onClickSelectAllCategories.bind(
              this
            )}
            onClickUnSelectAllCategories={this.onClickUnSelectAllCategories.bind(
              this
            )}
            onRightPanelMakeVisible={this.onRightPanelMakeVisible.bind(this)}
            onRightPanelMakeNotVisible={this.onRightPanelMakeNotVisible.bind(
              this
            )}
          />
        </Drawer>

        <Drawer
          open={showStartupInfo}
          anchor="right"
          onClose={this.onCloseStartupPanel.bind(this)}
        >
          <StartupInfo startupID={activeStartupID} />
        </Drawer>

        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={""}
            onChange={this.onChangeBottomNavigation.bind(this)}
          >
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

          <Dialog
            open={showTermsDialog}
            onClose={this.onCloseTermsDialog.bind(this)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Terms & Disclaimers
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Categories, startup status and funding status are self-reported
                by the startups. This listing might not be exhaustive.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCloseTermsDialog.bind(this)}>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </div>
    );
  }
}
