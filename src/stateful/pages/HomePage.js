import { Component } from "react";
import { CATEGORIES } from "../../constants/CategoryConstants.js";
import { STARTUP_STAGES } from "../../constants/StartupStageConstants.js";
import { FUNDING_STAGES } from "../../constants/FundingStageConstants.js";
import StartupScape from "../molecules/StartupScape.js";
import FilterPanel from "../molecules/FilterPanel.js";

function getGenericToIsSelected(values) {
  return values.reduce(function (categoryToIsSelected, category) {
    categoryToIsSelected[category] = true;
    return categoryToIsSelected;
  }, {});
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const categoryToIsSelected = getGenericToIsSelected(CATEGORIES);
    const startupStageToIsSelected = getGenericToIsSelected(STARTUP_STAGES);
    const fundingStageToIsSelected = getGenericToIsSelected(FUNDING_STAGES);

    this.state = {
      startupStageToIsSelected,
      fundingStageToIsSelected,
      categoryToIsSelected,
    };
  }

  onChangeCategory(category, isSelected) {
    let categoryToIsSelected = this.state.categoryToIsSelected;
    if (categoryToIsSelected[category] === isSelected) {
      return;
    }
    categoryToIsSelected[category] = isSelected;
    this.setState({ categoryToIsSelected });
  }

  onChangeStartupStage(startupStage, isSelected) {
    let startupStageToIsSelected = this.state.startupStageToIsSelected;
    if (startupStageToIsSelected[startupStage] === isSelected) {
      return;
    }
    startupStageToIsSelected[startupStage] = isSelected;
    this.setState({ startupStageToIsSelected });
  }

  onChangeFundingStage(fundingStage, isSelected) {
    let fundingStageToIsSelected = this.state.fundingStageToIsSelected;
    if (fundingStageToIsSelected[fundingStage] === isSelected) {
      return;
    }
    fundingStageToIsSelected[fundingStage] = isSelected;
    this.setState({ fundingStageToIsSelected });
  }

  render() {
    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
    } = this.state;
    const key = JSON.stringify({
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
    });
    return (
      <div className="div-home-page">
        <FilterPanel
          categoryToIsSelected={categoryToIsSelected}
          startupStageToIsSelected={startupStageToIsSelected}
          fundingStageToIsSelected={fundingStageToIsSelected}
          onChangeCategory={this.onChangeCategory.bind(this)}
          onChangeStartupStage={this.onChangeStartupStage.bind(this)}
          onChangeFundingStage={this.onChangeFundingStage.bind(this)}
        />
        <StartupScape
          key={key}
          categoryToIsSelected={categoryToIsSelected}
          startupStageToIsSelected={startupStageToIsSelected}
          fundingStageToIsSelected={fundingStageToIsSelected}
        />
      </div>
    );
  }
}
