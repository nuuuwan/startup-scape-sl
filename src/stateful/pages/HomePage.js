import React, { Component } from "react";
import html2canvas from "html2canvas";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";

import { MIN_WINDOW_INNER_WIDTH } from "../../constants/HomePageConstants.js";
import { CATEGORIES } from "../../constants/CategoryConstants.js";
import { STARTUP_STAGES } from "../../constants/StartupStageConstants.js";
import { FUNDING_STAGES } from "../../constants/FundingStageConstants.js";

import AppBarCustom from "../../nonstate/molecules/AppBarCustom.js";
import TreeMapTitle from "../../nonstate/molecules/TreeMapTitle.js";
import NotSupported from "../../nonstate/atoms/NotSupported.js";
import BottomNavigationCustom from "../../nonstate/molecules/BottomNavigationCustom.js";
import StartupInfo from "../../nonstate/molecules/StartupInfo.js";
import StartupScape from "../molecules/StartupScape.js";
import FilterPanel from "../molecules/FilterPanel.js";

import "./HomePage.css";

// const URL_STARTUPSCAPE = "https://twitter.com/search?q=%23StartupScapeSL&f=top";
const STARTUPSCAPE_TOP = 40;
const STARTUPSCAPE_BOTTOM = 100;
const STARTUPSCAPE_LEFT = 40;
const STARTUPSCAPE_RIGHT = 50;

const NAVIGATION_DELIMITER = ".";

function getGenericToIsSelected(values, isSelected) {
  return values.reduce(function (valueToIsSelected, value) {
    valueToIsSelected[value] = isSelected;
    return valueToIsSelected;
  }, {});
}

function encodeNavigationCode({
  startupStageToIsSelected,
  fundingStageToIsSelected,
  categoryToIsSelected,
}) {
  let tokens = [];
  for (let [tokenType, xToIsSelected] of [
    ["s", startupStageToIsSelected],
    ["f", fundingStageToIsSelected],
    ["c", categoryToIsSelected],
  ]) {
    for (let [i, isSelected] of Object.values(xToIsSelected).entries()) {
      if (isSelected) {
        tokens.push(`${tokenType}${i}`);
      }
    }
  }
  return tokens.join(NAVIGATION_DELIMITER);
}

export function getDefaultNavigationCode() {
  const startupStageToIsSelected = getGenericToIsSelected(STARTUP_STAGES, true);
  const fundingStageToIsSelected = getGenericToIsSelected(FUNDING_STAGES, true);
  const categoryToIsSelected = getGenericToIsSelected(CATEGORIES, true);

  return encodeNavigationCode({
    startupStageToIsSelected,
    fundingStageToIsSelected,
    categoryToIsSelected,
  });
}

function decodeNavigationCode(navigationCode) {
  let startupStageToIsSelected = getGenericToIsSelected(STARTUP_STAGES, false);
  let fundingStageToIsSelected = getGenericToIsSelected(FUNDING_STAGES, false);
  let categoryToIsSelected = getGenericToIsSelected(CATEGORIES, false);

  const config = {
    s: {
      xToIsSelected: startupStageToIsSelected,
      xList: STARTUP_STAGES,
    },
    f: {
      xToIsSelected: fundingStageToIsSelected,
      xList: FUNDING_STAGES,
    },
    c: {
      xToIsSelected: categoryToIsSelected,
      xList: CATEGORIES,
    },
  };

  return navigationCode.split(NAVIGATION_DELIMITER).reduce(
    function (
      {
        startupStageToIsSelected,
        fundingStageToIsSelected,
        categoryToIsSelected,
      },
      token
    ) {
      const tokenType = token.substring(0, 1);
      const tokenIndex = parseInt(token.substring(1));
      let { xToIsSelected, xList } = config[tokenType];

      xToIsSelected[xList[tokenIndex]] = true;

      return {
        startupStageToIsSelected,
        fundingStageToIsSelected,
        categoryToIsSelected,
      };
    },
    {
      startupStageToIsSelected,
      fundingStageToIsSelected,
      categoryToIsSelected,
    }
  );
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();

    const {
      startupStageToIsSelected,
      fundingStageToIsSelected,
      categoryToIsSelected,
    } = decodeNavigationCode(this.props.match.params.navigationCode);

    this.state = {
      startupStageToIsSelected,
      fundingStageToIsSelected,
      categoryToIsSelected,
      activeStartupID: undefined,

      width: window.innerWidth,

      showFilterPanel: false,
      showStartupInfo: false,
      isDownloading: false,
      showTermsDialog: false,
    };

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  onWindowResize(e) {
    const width = window.innerWidth;
    this.setState({ width });
  }

  onChangeCategory(categoryToIsSelected) {
    this.onChangeFilters({ categoryToIsSelected });
  }

  onChangeStartupStage(startupStageToIsSelected) {
    this.onChangeFilters({ startupStageToIsSelected });
  }

  onChangeFundingStage(fundingStageToIsSelected) {
    this.onChangeFilters({ fundingStageToIsSelected });
  }

  onChangeFilters({
    startupStageToIsSelected,
    fundingStageToIsSelected,
    categoryToIsSelected,
  }) {
    if (!startupStageToIsSelected) {
      startupStageToIsSelected = this.state.startupStageToIsSelected;
    }
    if (!fundingStageToIsSelected) {
      fundingStageToIsSelected = this.state.fundingStageToIsSelected;
    }
    if (!categoryToIsSelected) {
      categoryToIsSelected = this.state.categoryToIsSelected;
    }

    const navigationCode = encodeNavigationCode({
      startupStageToIsSelected,
      fundingStageToIsSelected,
      categoryToIsSelected,
    });

    window.history.pushState(
      "object or string",
      "Title",
      `/startup-scape-sl/${navigationCode}`
    );

    this.setState({
      startupStageToIsSelected,
      fundingStageToIsSelected,
      categoryToIsSelected,
    });
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

  onToggleFilter() {
    this.setState({ showFilterPanel: !this.state.showFilterPanel });
  }

  onCloseStartupPanel() {
    this.setState({ showStartupInfo: false });
  }

  onCloseTermsDialog() {
    this.setState({ showTermsDialog: false });
  }
  render() {
    const isWindowTooSmall = window.innerWidth < MIN_WINDOW_INNER_WIDTH;

    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
      activeStartupID,
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
        <AppBarCustom />

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
            <NotSupported />
          ) : (
            <>
              <TreeMapTitle homePage={this} />
              <StartupScape
                key={key}
                ref={this.ref}
                categoryToIsSelected={categoryToIsSelected}
                startupStageToIsSelected={startupStageToIsSelected}
                fundingStageToIsSelected={fundingStageToIsSelected}
                onClickImage={this.onClickImage.bind(this)}
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
          <BottomNavigationCustom homePage={this} />

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
