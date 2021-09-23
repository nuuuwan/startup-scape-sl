import { Component } from "react";
import { CATEGORIES } from "../../constants/CategoryConstants.js";
import StartupScape from "../molecules/StartupScape.js";
import FilterPanel from "../molecules/FilterPanel.js";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    let categoryToIsSelected = CATEGORIES.reduce(function (
      categoryToIsSelected,
      category
    ) {
      categoryToIsSelected[category] = false;
      return categoryToIsSelected;
    },
    {});

    categoryToIsSelected['Machine Learning'] = true;

    this.state = { categoryToIsSelected };
  }

  onChangeCategory(category, isSelected) {
    let categoryToIsSelected = this.state.categoryToIsSelected;
    if (categoryToIsSelected[category] !== isSelected) {
      categoryToIsSelected[category] = isSelected;
      this.setState({ categoryToIsSelected });
    }
  }

  render() {
    const { categoryToIsSelected } = this.state;
    const key = JSON.stringify(categoryToIsSelected);
    return (
      <div className="div-home-page">
        <FilterPanel
          categoryToIsSelected={categoryToIsSelected}
          onChangeCategory={this.onChangeCategory.bind(this)}
        />
        <StartupScape key={key} categoryToIsSelected={categoryToIsSelected} />
      </div>
    );
  }
}
