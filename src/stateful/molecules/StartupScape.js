import { Component } from "react";

import Startups from "../../core/Startups.js";
import TreeMap from "../../nonstate/molecules/TreeMap2.js";

import "./StartupScape.css";
const WIDHT_PADDING = 24;
const HEIGHT_HEADER = 100;
const HEIGHT_FOOTER = 150;

export default class StartupScape extends Component {
  render() {
    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
      onClickImage,
      rightPanelWidth,
    } = this.props;
    const treemapData = Startups.getTreeMapData(
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected
    );
    const height = window.innerHeight - HEIGHT_FOOTER - HEIGHT_HEADER;
    const width = window.innerWidth - WIDHT_PADDING * 2 - rightPanelWidth;
    return (
      <div className="div-startup-scape">
        <TreeMap
          data={treemapData}
          height={height}
          width={width}
          onClickImage={onClickImage}
        />
      </div>
    );
  }
}
