import { Component } from "react";
import CategorySelector from "../molecules/CategorySelector.js";
import StartupScape from "../molecules/StartupScape.js";

export default class HomePage extends Component {
  render() {
    return (
      <div className="div-home-page">
        <CategorySelector />
        <StartupScape />
      </div>
    );
  }
}
