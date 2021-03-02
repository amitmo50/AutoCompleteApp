import React, { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  console.log('render');
  const [search, setSearch] = useState('');
  const [filteredStates, setFilteredStates] = useState("");

  useEffect(() => {
    /* Using the Debounce method to reduce the app rendering */
    const timer = setTimeout(() => {
        if(search !== ""){
            axios.get('/api/coutries', { 
                params: {
                    word: search
                }
            })
            .then(res => setFilteredStates(res.data))
        }else {
            setFilteredStates("")
        }
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const handleClickOnItem = (itemName) => {
    setSearch(itemName)
  }

  return (
    <div className="auto-complete-container">
        <h1 className="header">Auto Complete</h1>
        <TextField className="input-bar" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
        <ul className="list-container">
            {filteredStates &&
            filteredStates.map(state => {
                return <li onClick={() => handleClickOnItem(state.name)} className="items" key={state.code}>{state.name}</li>;
            })}
        </ul>
    </div>
  );
};

export default SearchBar;