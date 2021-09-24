import { Component } from "react";
import Selector from "./Selector.js";

import "./FilterPanel.css";
import imageFilter from '../../assets/images/filter.png';

export default class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: true };
  }
  onMakeVisible() {
    this.setState({ isVisible: true });
  }
  onMakeNotVisible() {
    this.setState({ isVisible: false });
  }

  renderNotVisible() {
    return (
      <div
        className="div-button div-button-show"
        onClick={this.onMakeVisible.bind(this)}
      >
        <img className="img-filter" src={imageFilter} alt="Filter" />
      </div>
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
        <div
          className="div-button div-button-x"
          onClick={this.onMakeNotVisible.bind(this)}
        >
          ✖️
        </div>
        <div className="div-filter-label">
          Filter by Startup Stage
        </div>
        <Selector
          valueToIsSelected={startupStageToIsSelected}
          onChange={onChangeStartupStage}
        />
        <div className="div-filter-label">
          Filter by Funding Stage
        </div>
        <Selector
          valueToIsSelected={fundingStageToIsSelected}
          onChange={onChangeFundingStage}
        />
        <div className="div-filter-label">
          Filter by Startup Category
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
    return (
      <div className="div-filter-panel">
        {isVisible ? this.renderVisible() : this.renderNotVisible()}
      </div>
    );
  }
}
