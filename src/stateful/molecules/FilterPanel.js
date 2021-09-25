import { Component } from "react";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
      onClickSelectAllCategories,
      onClickUnSelectAllCategories,
    } = this.props;
    return (
      <div className="div-filter-panel" >
      <Box sx={{ padding: 1 }}>
        <Selector
          label="Startup Stage"
          valueToIsSelected={startupStageToIsSelected}
          onChange={onChangeStartupStage}
        />

        <Selector
          label="Funding Stage"
          valueToIsSelected={fundingStageToIsSelected}
          onChange={onChangeFundingStage}
        />

        <Selector
          label="Category"
          valueToIsSelected={categoryToIsSelected}
          onChange={onChangeCategory}
          onClickSelectAll={onClickSelectAllCategories}
          onClickUnSelectAll={onClickUnSelectAllCategories}
        />
      </Box>
      </div>
    );
  }

}
