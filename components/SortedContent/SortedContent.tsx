'use client';
import {FC, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {filterControl} from './SortedContent.styled';
import FormControl from '@mui/material/FormControl';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  sort: (param: string) => void
}

export const SortedContent: FC<IProps> = ({sort}) => {
  const [sorted, setSorted] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSorted(event.target.value);
    sort(event.target.value);
  };

  return (
    <div>
      <FormControl sx={filterControl}>
        <InputLabel sx={{color: 'white'}}>
          Отображать...
        </InputLabel>
        <Select
          value={sorted}
          onChange={handleChange}
          autoWidth
          label="Отображать..."
          sx={{backgroundColor: '#1240AB', color: 'white'}}
        >
          <MenuItem value={'popularity'}>
            <em>По популярности</em>
          </MenuItem>
          <MenuItem value={'release_date'}>По дате</MenuItem>
          <MenuItem value={'title'}>По названию</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};