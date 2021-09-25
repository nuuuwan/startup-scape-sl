import { Component } from "react";

import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

import Selector from "./Selector.js";

import "./FilterPanel.css";

export default class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }
  onMakeVisible() {
    this.props.onRightPanelMakeVisible();
    this.setState({ isVisible: true });
  }
  onMakeNotVisible() {
    this.props.onRightPanelMakeNotVisible();
    this.setState({ isVisible: false });
  }

  renderNotVisible() {
    return (
      <FilterAltIcon
        className="icon-filter"
        onClick={this.onMakeVisible.bind(this)}
      />
    );
  }
  renderVisible() {
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
        <IconButton onClick={this.onMakeNotVisible.bind(this)}>
          <CloseIcon />
        </IconButton>
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
  render() {
    const { isVisible } = this.state;
    if (isVisible) {
      return (
        <div className="div-filter-panel div-filter-panel-visible">
          {this.renderVisible()}
        </div>
      );
    } else {
      return <div className="div-filter-panel">{this.renderNotVisible()}</div>;
    }
  }
}
