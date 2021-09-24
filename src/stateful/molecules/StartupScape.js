import { Component } from "react";

import Startups from "../../core/Startups.js";
import TreeMap from "../../nonstate/molecules/TreeMap.js";

import "./StartupScape.css";

const WIDTH = 1440;
const HEIGHT = (WIDTH * 9) / 16;

export default class StartupScape extends Component {
  render() {
    const {
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected,
    } = this.props;
    const treemapData = Startups.getTreeMapData(
      categoryToIsSelected,
      startupStageToIsSelected,
      fundingStageToIsSelected
    );
    return (
      <div className="div-startup-scape">
        <TreeMap data={treemapData} height={HEIGHT} width={WIDTH} />
      </div>
    );
  }
}
