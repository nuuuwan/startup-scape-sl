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
      <Box sx={{ padding: 1 }}>
        <Typography variant="overline" display="block" gutterBottom>
          Filter by <strong>Startup Category</strong>
        </Typography>

        <Selector
          valueToIsSelected={startupStageToIsSelected}
          onChange={onChangeStartupStage}
        />

        <Divider />

        <Typography variant="overline" display="block" gutterBottom>
          Filter by <strong>Funding Stage</strong>
        </Typography>

        <Selector
          valueToIsSelected={fundingStageToIsSelected}
          onChange={onChangeFundingStage}
        />

        <Divider />

        <Typography variant="overline" display="block" gutterBottom>
          Filter by <strong>Startup Stage</strong>
        </Typography>

        <Selector
          valueToIsSelected={categoryToIsSelected}
          onChange={onChangeCategory}
          onClickSelectAll={onClickSelectAllCategories}
          onClickUnSelectAll={onClickUnSelectAllCategories}
        />
      </Box>
    );
  }

}
