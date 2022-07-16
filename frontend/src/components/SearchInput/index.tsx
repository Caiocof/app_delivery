import { MagnifyingGlass } from 'phosphor-react';
import React, { FormEvent, useState } from 'react';

import './styles.css';

interface SearchInputProps {
  mainColor: string;
  onSearch: (searchValue: string) => void;
}

export const SearchInput = ({ mainColor, onSearch }: SearchInputProps) => {
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const internalSearch = (event: FormEvent) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form
      onSubmit={internalSearch}
      className="divSearch"
      style={{ borderColor: focused ? mainColor : '#FFF' }}
    >
      <button type="submit" className="buttonSearch">
        <MagnifyingGlass size={30} weight="bold" color={mainColor} />
      </button>
      <input
        className="inputSearch"
        placeholder="Digite o nome do Burger"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </form>
  );
};
