import { Component } from "react";

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
      <div>
        <div className="div-filter-label">
          Filter by <strong>Startup Category</strong>
        </div>
        <Selector
          valueToIsSelected={startupStageToIsSelected}
          onChange={onChangeStartupStage}
        />
        <div className="div-filter-label">
          Filter by <strong>Funding Stage</strong>
        </div>
        <Selector
          valueToIsSelected={fundingStageToIsSelected}
          onChange={onChangeFundingStage}
        />
        <div className="div-filter-label">
          Filter by <strong>Startup Stage</strong>
        </div>
        <Selector
          valueToIsSelected={categoryToIsSelected}
          onChange={onChangeCategory}
          onClickSelectAll={onClickSelectAllCategories}
          onClickUnSelectAll={onClickUnSelectAllCategories}
        />
      </div>
    );
  }

}
