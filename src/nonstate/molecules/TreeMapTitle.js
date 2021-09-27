import Typography from "@mui/material/Typography";
import Startups from "../../core/Startups.js";

function getSelected(valueToIsSelected) {
  return Object.entries(valueToIsSelected)
    .filter(([value, isSelected]) => isSelected)
    .map(([value, isSelected]) => value);
}

export default function TreeMapTitle({ homePage }) {
  const {
    categoryToIsSelected,
    startupStageToIsSelected,
    fundingStageToIsSelected,
  } = homePage.state;

  const startups = Startups.getFiltered(
    categoryToIsSelected,
    startupStageToIsSelected,
    fundingStageToIsSelected
  );

  const n = startups.length;
  const selectedCategories = getSelected(categoryToIsSelected);
  const selectedStartupStages = getSelected(startupStageToIsSelected);
  const selectedFundingStages = getSelected(fundingStageToIsSelected);

  const nCategories = selectedCategories.length;
  const nStartupStages = selectedStartupStages.length;
  const nFundingStages = selectedFundingStages.length;

  let displayCategory = "";
  if (nCategories > 0) {
    if (nCategories === 43) {
      displayCategory = " (all)";
    } else if (nCategories < 10) {
      displayCategory += " (" + selectedCategories.join(", ") + ")";
    }
  }

  let displayStartupStage = "";
  if (nStartupStages > 0) {
    if (nStartupStages === 6) {
      displayStartupStage = " (all)";
    } else {
      displayStartupStage += " (" + selectedStartupStages.join(", ") + ")";
    }
  }

  let displayFundingStage = "";
  if (nFundingStages > 0) {
    if (nFundingStages === 9) {
      displayFundingStage = " (all)";
    } else {
      displayFundingStage += " (" + selectedFundingStages.join(", ") + ")";
    }
  }

  return (
    <Typography variant="body1" align="center" gutterBottom noWrap>
      {`${n} Startups `}
      {` · ${nCategories} categories${displayCategory}`}
      {` · ${nStartupStages} startup stages${displayStartupStage}`}
      {` · ${nFundingStages} funding stages${displayFundingStage}`}
    </Typography>
  );
}
