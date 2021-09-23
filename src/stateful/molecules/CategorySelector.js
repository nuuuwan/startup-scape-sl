import { Component } from "react";
import { CATEGORIES } from "../../constants/CategoryConstants.js";
import "./CategorySelector.css";

export default class CategorySelector extends Component {
  render() {
    return (
      <div className="div-category-selector">
        {
          CATEGORIES.map(function (category, iCategory) {
            const key = `div-category-${iCategory}`;
            return (
              <div className="div-category-selector-item" key={key}>
                <input type="checkbox" value={category} />
                <label>{category}</label>
              </div>
            );
          })
        }
      </div>
    )
  }
}
