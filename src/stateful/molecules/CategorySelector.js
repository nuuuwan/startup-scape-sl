import { Component } from "react";
import { CATEGORIES } from "../../constants/CategoryConstants.js";
import "./CategorySelector.css";

export default class CategorySelector extends Component {
  onChange(e) {
    const category = e.target.value;
    const isSelected = e.target.checked;
    this.props.onChangeCategory(category, isSelected);
  }
  render() {
    const { categoryToIsSelected } = this.props;

    return (
      <div className="div-category-selector">
        {CATEGORIES.map(
          function (category, iCategory) {
            const key = `div-category-${iCategory}`;
            const isSelected = categoryToIsSelected[category];
            return (
              <div className="div-category-selector-item" key={key}>
                <input
                  type="checkbox"
                  value={category}
                  checked={isSelected}
                  onChange={this.onChange.bind(this)}
                />
                <label>{category}</label>
              </div>
            );
          }.bind(this)
        )}
      </div>
    );
  }
}
