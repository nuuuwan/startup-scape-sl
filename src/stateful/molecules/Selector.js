import { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from "@material-ui/core/Checkbox";
import "./Selector.css";

export default class Selector extends Component {

  onClickSelectAll() {
    this.props.onClickSelectAll();
  }

  onClickUnSelectAll() {
    this.props.onClickUnSelectAll();
  }

  render() {
    const { valueToIsSelected, onClickSelectAll } = this.props;

    const renderedMultiSelectors = onClickSelectAll ? (
      <div>
        <div
          className="div-select-all div-multi-select"
          onClick={this.onClickSelectAll.bind(this)}
        >
          Select All
        </div>
        <div
          className="div-unselect-all div-multi-select"
          onClick={this.onClickUnSelectAll.bind(this)}
        >
          Un-Select All
        </div>
      </div>
    ) : null;

    return (
      <List>
        {renderedMultiSelectors}
        {Object.entries(valueToIsSelected).map(
          function ([value, isSelected], iValue) {
            const key = `div-selector-item-${iValue}`;
            const handleToggle = function() {
              this.props.onChange(value, !isSelected);
            }.bind(this);
            return (
              <ListItem key={key}>
                <ListItemButton onClick={handleToggle}>
                  <Checkbox
                    className="input-checkbox"
                    size="small"
                    color="default"
                    value={value}
                    checked={isSelected}
                  />
                  <ListItemText primary={value} />
                  </ListItemButton>
              </ListItem>
            );
          }.bind(this)
        )}
      </List>
    );
  }
}
