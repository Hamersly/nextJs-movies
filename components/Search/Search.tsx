'use client';
import {FC, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {searchIconStyle, SearchIconWrapper, SearchTag, StyledInputBase} from './Search.styled';
import {useRouter} from 'next/navigation';


export const Search: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const searchText = () => {
    if (query.trim().length) {
      router.push(`/search/${query}`, {query: query});
      setQuery('');

    }
  };

  const handleSubmit = (e: any) => {
    if (e.key === 'Enter') {
      searchText();
    }
  };

  return (
    <SearchTag>
      <SearchIconWrapper>
        <SearchIcon sx={searchIconStyle}/>
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Поиск…"
        inputProps={{'aria-label': 'поиск'}}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSubmit}
      />
    </SearchTag>
  );
};