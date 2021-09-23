import { Component } from "react";
import Startups from "../../core/Startups.js";

export default class StartupScape extends Component {
  constructor(props) {
    super(props);
    this.state = { startups: undefined };
  }

  async componentDidMount() {
    const startups = await Startups.getAll();
    this.setState({ startups });
  }

  render() {
    const { startups } = this.state;
    if (startups === undefined) {
      return "Loading...";
    }
    return <div>{JSON.stringify(startups)}</div>;
  }
}
