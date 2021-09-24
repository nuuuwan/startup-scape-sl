import { Component } from "react";
import "./Selector.css";

export default class Selector extends Component {
  onChange(e) {
    const value = e.target.value;
    const isSelected = e.target.checked;
    this.props.onChange(value, isSelected);
  }

  onClickSelectAll() {
    this.props.onClickSelectAll();
  }

  onClickUnSelectAll() {
    this.props.onClickUnSelectAll();
  }

  render() {
    const { valueToIsSelected, onClickSelectAll } = this.props;

    const renderedMultiSelectors = onClickSelectAll ? (
      <div>
        <div
          className="div-select-all div-multi-select"
          onClick={this.onClickSelectAll.bind(this)}
        >
          Select All
        </div>
        <div
          className="div-unselect-all div-multi-select"
          onClick={this.onClickUnSelectAll.bind(this)}
        >
          Un-Select All
        </div>
      </div>
    ) : null;

    return (
      <div className="div-selector">
        {renderedMultiSelectors}
        {Object.entries(valueToIsSelected).map(
          function ([value, isSelected], iValue) {
            const key = `div-selector-item-${iValue}`;
            const classNameLabel =
              "label" + (isSelected ? " label-selected" : "");
            return (
              <div className="div-selector-item" key={key}>
                <input
                  className="input-checkbox"
                  type="checkbox"
                  value={value}
                  checked={isSelected}
                  onChange={this.onChange.bind(this)}
                />
                <label className={classNameLabel}>{value}</label>
              </div>
            );
          }.bind(this)
        )}
      </div>
    );
  }
}
