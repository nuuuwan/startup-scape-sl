import { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';


import "./Selector.css";

export default class Selector extends Component {

  render() {
    const { label, valueToIsSelected, onChange } = this.props;

    const allValues = Object.keys(valueToIsSelected);
    const selectedValues = Object.entries(valueToIsSelected).filter(([value, isSelected]) => isSelected).map(([value, isSelected]) => value);

    function onChangeInner(e) {
      const newSelectedValues = e.target.value;
      const newValueToIsSelected = allValues.reduce(
        function(newValueToIsSelected, value) {
          newValueToIsSelected[value] = newSelectedValues.includes(value);
          return newValueToIsSelected;
        },
        {},
      );
      onChange(newValueToIsSelected);
    }

    return (
      <div>
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            input={<OutlinedInput label="Chip" />}
            value={selectedValues}
            onChange={onChangeInner}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allValues.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
    );
  }
}
