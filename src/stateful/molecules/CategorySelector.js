import { Component } from "react";
import {CATEGORIES} from '../../constants/CategoryConstants.js';

export default class CategorySelector extends Component {
  render() {
    return JSON.stringify(CATEGORIES);
  }
}
