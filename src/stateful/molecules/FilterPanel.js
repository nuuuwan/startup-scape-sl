import { Component } from "react";
import Selector from "./Selector.js";

import "./FilterPanel.css";

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
        Show Filters
      </div>
    );
  }
  renderVisible() {
    const { categoryToIsSelected, onChangeCategory } = this.props;
    return (
      <div>
        <div
          className="div-button div-button-x"
          onClick={this.onMakeNotVisible.bind(this)}
        >
          ✖️
        </div>
        <Selector
          valueToIsSelected={categoryToIsSelected}
          onChange={onChangeCategory}
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
