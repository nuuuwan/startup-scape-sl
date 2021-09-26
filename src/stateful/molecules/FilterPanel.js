import { Component } from "react";
import Box from "@mui/material/Box";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TimelineIcon from "@mui/icons-material/Timeline";
import CategoryIcon from "@mui/icons-material/Category";

import Selector from "./Selector.js";

import "./FilterPanel.css";

export default class FilterPanel extends Component {
  render() {
    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
      onChangeCategory,
      onChangeStartupStage,
      onChangeFundingStage,
    } = this.props;
    return (
      <div className="div-filter-panel">
        <Box sx={{ padding: 1 }}>
          <Selector
            label="Startup Stages"
            valueToIsSelected={startupStageToIsSelected}
            onChange={onChangeStartupStage}
            icon={<TimelineIcon />}
          />

          <Selector
            label="Funding Stages"
            valueToIsSelected={fundingStageToIsSelected}
            onChange={onChangeFundingStage}
            icon={<MonetizationOnIcon />}
          />

          <Selector
            label="Startup Categories"
            valueToIsSelected={categoryToIsSelected}
            onChange={onChangeCategory}
            icon={<CategoryIcon />}
          />
        </Box>
      </div>
    );
  }
}
