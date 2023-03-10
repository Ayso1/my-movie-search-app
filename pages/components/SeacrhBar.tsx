import { SetStateAction, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import {
  createTheme,
  IconButton,
  TextField,
  ThemeProvider,
} from '@mui/material';
import config from './config';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00000',
    },
  },
});

function SearchBar(props: any) {
  const [searchQuery, setSearchQuery] = useState('');
  //const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);

  function handleInputChange(e: any) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }
  const handleSubmit = async (e: any) => {
    setLoading(true);
    setSearchQuery(e.target.value);
    const URL = `${config.apiUrl}${searchQuery}&apikey=${config.apiKey}`;
    axios.get(URL).then(
      (res) => {
        //setData(res.data.Search);
        props.onSearch(res.data.Search);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
    e.preventDefault();
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="search-bar"
          className="text"
          value={searchQuery}
          onChange={handleInputChange}
          label="Enter a movie name"
          variant="outlined"
          placeholder="Search..."
          size="small"
          color="primary"
          focused
        />
        <IconButton type="submit" aria-label="search" onClick={handleSubmit}>
          <SearchIcon style={{ fill: 'black' }} />
        </IconButton>
      </form>
    </ThemeProvider>
  );
}

export default SearchBar;
