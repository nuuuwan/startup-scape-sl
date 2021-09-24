import { Component } from "react";
import { CATEGORIES } from "../../constants/CategoryConstants.js";
import { STARTUP_STAGES } from "../../constants/StartupStageConstants.js";
import { FUNDING_STAGES } from "../../constants/FundingStageConstants.js";
import Startups from '../../core/Startups.js';
import StartupScape from "../molecules/StartupScape.js";
import FilterPanel from "../molecules/FilterPanel.js";

import './HomePage.css';

function getGenericToIsSelected(values) {
  return values.reduce(function (valueToIsSelected, value) {
    valueToIsSelected[value] = true;
    return valueToIsSelected;
  }, {});
}

function getCountSelected(valueToIsSelected) {
  const selectedValues = Object.entries(valueToIsSelected).filter(
    ([value, isSelected]) => isSelected,
  );
  return selectedValues.length;
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

  renderSubTitle() {
    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
    } = this.state;

    const startups = Startups.getFiltered(categoryToIsSelected,
    startupStageToIsSelected,
    fundingStageToIsSelected,)

    const n = startups.length;
    const nCategories = getCountSelected(categoryToIsSelected);
    const nStartupStages = getCountSelected(startupStageToIsSelected);
    const nFundingStages = getCountSelected(fundingStageToIsSelected);

    return `${n} Startups for ${nCategories} categories, ${nStartupStages} startup stages, and ${nFundingStages} funding stages`;
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
        <div className="div-title">Startups in Sri Lanka</div>
        <div className="div-sub-title">{this.renderSubTitle()}</div>

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

        <div className="div-source">{'Data by startupsl.lk · Visualization by @nuuuwan'}</div>
      </div>
    );
  }
}
