import { Component } from "react";

import Startups from "../../core/Startups.js";
import TreeMap from "../../nonstate/molecules/TreeMap.js";

import "./StartupScape.css";
const WIDTH_PADDING = 50;
const HEIGHT_HEADER = 120;
const HEIGHT_FOOTER = 110;

export default class StartupScape extends Component {
  render() {
    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
      onClickImage,
    } = this.props;
    const treemapData = Startups.getTreeMapData(
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected
    );
    const top = HEIGHT_HEADER;
    const left = WIDTH_PADDING;
    const height = window.innerHeight - HEIGHT_FOOTER - HEIGHT_HEADER;
    const width = window.innerWidth - WIDTH_PADDING * 2;
    return (
      <div className="div-startup-scape">
        <TreeMap
          data={treemapData}
          top={top}
          left={left}
          height={height}
          width={width}
          onClickImage={onClickImage}
        />
      </div>
    );
  }
}
