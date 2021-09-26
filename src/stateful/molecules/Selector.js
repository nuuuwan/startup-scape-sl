import { Component } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import "./Selector.css";

const TEXT_SELECT_ALL = "Select All";
const TEXT_UNSELECT_ALL = "Unselect All";

export default class Selector extends Component {
  render() {
    const { label, valueToIsSelected, onChange } = this.props;

    const allValues = Object.keys(valueToIsSelected);
    const selectedValues = Object.entries(valueToIsSelected)
      .filter(([value, isSelected]) => isSelected)
      .map(([value, isSelected]) => value);
    const nSelected = selectedValues.length;

    const isSelectAll = allValues.length === selectedValues.length;
    const isSelectNone = 0 === selectedValues.length;

    function onChangeInner(e) {
      const newSelectedValues = e.target.value;

      let newValueToIsSelected;
      if (newSelectedValues.includes(TEXT_SELECT_ALL)) {
        newValueToIsSelected = allValues.reduce(function (
          newValueToIsSelected,
          value
        ) {
          newValueToIsSelected[value] = true;
          return newValueToIsSelected;
        },
        {});
      } else if (newSelectedValues.includes(TEXT_UNSELECT_ALL)) {
        newValueToIsSelected = allValues.reduce(function (
          newValueToIsSelected,
          value
        ) {
          newValueToIsSelected[value] = false;
          return newValueToIsSelected;
        },
        {});
      } else {
        newValueToIsSelected = allValues.reduce(function (
          newValueToIsSelected,
          value
        ) {
          newValueToIsSelected[value] = newSelectedValues.includes(value);
          return newValueToIsSelected;
        },
        {});
      }

      onChange(newValueToIsSelected);
    }

    const menuDisplayValues = [].concat(
      [TEXT_SELECT_ALL, TEXT_UNSELECT_ALL],
      allValues
    );

    const labelFinal = `${label} (${nSelected} selected)`;

    return (
      <div>
        <InputLabel>{labelFinal}</InputLabel>
        <Select
          multiple
          input={<OutlinedInput label="Chip" />}
          value={selectedValues}
          onChange={onChangeInner}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {menuDisplayValues.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}
