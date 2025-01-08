import './App.css';
// import {useState} from 'react'
import Navbar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AllRecipesPage from './Pages/AllRecipesPage';
import RecipeDetailsPage from './Pages/RecipeDetailsPage';
import CreateRecipePage from './Pages/CreateRecipePage';
import EditRecipe from './Pages/EditRecipe';
import Dashboard from './Pages/Dashboard';
import FAQPage from './Pages/FAQPage';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import { CssBaseline } from '@mui/material';
import { appTheme } from './themes/theme';
import { ThemeProvider } from '@mui/material';
import isAnon from './Components/isAnon';
import isPrivate from './Components/isPrivate';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Navbar />
      <Routes>
      
        <Route path="/login" element={<isAnon><Login /></isAnon>} />
        <Route path="/signup" element={<isAnon><Signup /></isAnon>} />
        <Route path="/dashboard" element={<isPrivate><Dashboard /></isPrivate>} />
        <Route path="/dashboard/edit/:id" element={<isPrivate><EditRecipe /></isPrivate>} />
        <Route path="/dashboard/CreateRecipe" element={<isPrivate><CreateRecipePage /></isPrivate>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<AllRecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="/FAQ" element={<FAQPage />} />
        <Route path="/*" element={<ErrorPage />} />
        
      </Routes>
    </ThemeProvider>
  );
}

export default App;
