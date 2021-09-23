import { Component } from "react";
import { CATEGORIES } from "../../constants/CategoryConstants.js";
import CategorySelector from "../molecules/CategorySelector.js";
import StartupScape from "../molecules/StartupScape.js";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const categoryToIsSelected = CATEGORIES.reduce(
      function(categoryToIsSelected, category) {
        categoryToIsSelected[category] = true;
        return categoryToIsSelected;
      },
      {},
    )
    this.state = {categoryToIsSelected};
  }

  onChangeCategory(category, isSelected) {
    let categoryToIsSelected = this.state.categoryToIsSelected;
    if (categoryToIsSelected[category] !== isSelected) {
      categoryToIsSelected[category] = isSelected;
      this.setState({categoryToIsSelected});
    }
  }

  render() {
    const {categoryToIsSelected} = this.state;
    return (
      <div className="div-home-page">
        <CategorySelector categoryToIsSelected={categoryToIsSelected} onChangeCategory={this.onChangeCategory.bind(this)}/>
        <StartupScape categoryToIsSelected={categoryToIsSelected} />
      </div>
    );
  }
}
