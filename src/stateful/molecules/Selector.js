import { Component } from "react";
import "./Selector.css";

export default class Selector extends Component {

  onChange(e) {
    const value = e.target.value;
    const isSelected = e.target.checked;
    this.props.onChange(value, isSelected);
  }

  render() {
    const { valueToIsSelected } = this.props;

    return (
      <div className="div-selector">
        {Object.entries(valueToIsSelected).map(
          function ([value, isSelected], iValue) {
            const key = `div-selector-item-${iValue}`;
            return (
              <div className="div-selector-item" key={key}>
                <input
                  type="checkbox"
                  value={value}
                  checked={isSelected}
                  onChange={this.onChange.bind(this)}
                />
                <label>{value}</label>
              </div>
            );
          }.bind(this)
        )}
      </div>
    );
  }
}
