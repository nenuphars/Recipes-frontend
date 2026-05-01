import { useState, type Dispatch, type SetStateAction } from 'react';
import { useEffect } from 'react';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  TextField,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import { appTheme } from '../themes/theme';
import { Search, Close } from '@mui/icons-material';
import './searchBar.css';
import { getAllRecipes } from '../services/recipes.services';
import type { Recipe } from '../types/recipe.types';

type SearchType = 'name' | 'ingredient' | 'tag';

type SearchBarProps = {
  setAllRecipes: Dispatch<SetStateAction<Recipe[]>>;
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
};

function SearchBar({ setAllRecipes, setIsFiltering }: SearchBarProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // const [searchType, setSearchType] = useState('name');

  const smallScreen = useMediaQuery(
    json2mq({
      maxWidth: 720,
    }),
  );

  // search query state
  const [activeQuery, setActiveQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedSearchType, setSelectedSearchType] =
    useState<SearchType>('name');

  // gets data once
  useEffect(() => {
    getAllRecipes()
      .then((recipes: Recipe[]) => {
        setAllRecipes(recipes);
        setRecipes(recipes);
        setFilteredRecipes(recipes);
        console.log(recipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (activeQuery !== '') {
      setIsFiltering(true);
      const searchTerm = activeQuery.toLowerCase();

      if (selectedSearchType === 'name') {
        const filtered = recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchTerm),
        );
        setFilteredRecipes(filtered);
        setAllRecipes(filtered);
      } else if (selectedSearchType === 'ingredient') {
        const filtered = recipes.filter((oneRecipe) =>
          oneRecipe.ingredientsList.some((ingredientObj) =>
            ingredientObj.ingredient_name.toLowerCase().includes(searchTerm),
          ),
        );
        setFilteredRecipes(filtered);
        setAllRecipes(filtered);
      } else if (selectedSearchType === 'tag') {
        const filtered = recipes.filter((oneRecipe) =>
          oneRecipe.tags.some((oneTag) =>
            oneTag.toLowerCase().includes(searchTerm),
          ),
        );
        setFilteredRecipes(filtered);
        setAllRecipes(filtered);
      }
    } else {
      setFilteredRecipes(recipes);
      setIsFiltering(false);
    }
  }, [activeQuery, selectedSearchType, recipes, setAllRecipes]);

  const handleSearchTypeChange = (newType: SearchType) => {
    setSelectedSearchType(newType);
  };

  const handleSearchQuery = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setActiveQuery(e.target.value);
  };

  function clearSearch() {
    setFilteredRecipes(recipes);
    setIsFiltering(false);
    setActiveQuery('');
  }

  return (
    <div id="search-bar-container">
      <Stack sx={{ width: smallScreen ? '300px' : '616px' }} gap={2}>
        <ButtonGroup variant="text" aria-label="Basic button group">
          <Button
            variant={selectedSearchType === 'name' ? 'contained' : 'outlined'}
            sx={{
              color: appTheme.palette.background.default,
              backgroundColor:
                selectedSearchType === 'name'
                  ? appTheme.palette.secondary.main
                  : appTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: appTheme.palette.secondary.main,
              },
            }}
            onClick={() => {
              handleSearchTypeChange('name');
            }}
          >
            Title
          </Button>
          <Button
            variant={
              selectedSearchType === 'ingredient' ? 'contained' : 'outlined'
            }
            sx={{
              color: appTheme.palette.background.default,
              backgroundColor:
                selectedSearchType === 'ingredient'
                  ? appTheme.palette.secondary.main
                  : appTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: appTheme.palette.secondary.main,
              },
            }}
            onClick={() => {
              handleSearchTypeChange('ingredient');
            }}
          >
            Ingredient
          </Button>
          <Button
            variant={selectedSearchType === 'tag' ? 'contained' : 'outlined'}
            sx={{
              color: appTheme.palette.background.default,
              backgroundColor:
                selectedSearchType === 'tag'
                  ? appTheme.palette.secondary.main
                  : appTheme.palette.primary.main,
              '&:hover': {
                backgroundColor: appTheme.palette.secondary.main,
              },
            }}
            onClick={() => {
              handleSearchTypeChange('tag');
            }}
          >
            Tag
          </Button>
        </ButtonGroup>

        <TextField
          label="Search"
          value={activeQuery}
          onChange={(e) => handleSearchQuery(e)}
          InputProps={{
            startAdornment: <Search />,

            endAdornment: (
              <Button onClick={clearSearch}>
                <Close />
              </Button>
            ),
          }}
        />
      </Stack>

      {activeQuery && (
        <Stack
          spacing={0}
          sx={{
            width: smallScreen ? '300px' : '616px',
            position: 'absolute',
            zIndex: 100,
          }}
        >
          {filteredRecipes.map((eachRecipe) => {
            return (
              <Link
                to={`/recipes/${eachRecipe._id}`}
                style={{ color: 'black', textDecoration: 'none' }}
                key={eachRecipe._id}
              >
                <Card
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '40px',
                    width: 'inherit',
                  }}
                >
                  <CardContent>
                    <Typography variant="body2">{eachRecipe.name}</Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Stack>
      )}
    </div>
  );
}

export default SearchBar;
