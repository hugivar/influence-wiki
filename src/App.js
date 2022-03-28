import React from 'react';
import wiki from 'wikijs';
import Box from '@material-ui/core/Box';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { styled, alpha } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/core/Autocomplete';

import logo from './logo.svg';
import './App.css';

const wikiSearch = async (text) => { 
  console.log('App line:16', wikiSearch);
  const result = wiki().search(text);
  console.log('18', await result)
};

const asyncFunctionDebounced = AwesomeDebouncePromise(
  wikiSearch,
  500,
  {},
);

// TODO: Hugo: Implement search box
// TODO: Hugo: Implement different algorithms - bands(associatedActs) and people (Doctoral advisor, Doctoral students)
// TODO: Hugo: Connection library (d3.js or graph representation)
// TODO: Hugo: Implement query levels - defaults to 2

// function App() {
//   const level0Connections = [];
//   const level1Connections = [];
//   const level2Connections = [];

//   React.useEffect(() => {
//     wiki()
//       .page('Nirvana_(band)')
//       .then(async page => {
//         console.log('page', page, await page.info());
//         return page.info('associatedActs')
//       })
//       .then(console.log);
//   });

//   return (
//     <div className="App">
//       <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={evt => console.log(evt.target.value)} />
//     </Box>
//     </div>
//   );
// }

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Influence Wiki
          </Typography>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={[]}
            renderInput={(params) => (
              <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={evt => asyncFunctionDebounced(evt.target.value)}
                {...params}
              />
            </Search>
            )}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}