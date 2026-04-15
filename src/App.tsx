// import {useState} from 'react'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar.jsx';
import IsAnon from './Components/IsAnon.jsx';
import Login from './Pages/Login.js';
import Signup from './Pages/SignUp.jsx';
import IsPrivate from './Components/IsPrivate.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import EditRecipe from './Pages/EditRecipe.jsx';
import CreateRecipePage from './Pages/CreateRecipePage.jsx';
import HomePage from './Pages/HomePage.js';
import AllRecipesPage from './Pages/AllRecipesPage.jsx';
import RecipeDetailsPage from './Pages/RecipeDetailsPage.js';
import FAQPage from './Pages/FAQPage.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import { appTheme } from './themes/theme.jsx';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          }
        />

        <Route
          path="/dashboard/edit/:id"
          element={
            <IsPrivate>
              <EditRecipe />
            </IsPrivate>
          }
        />
        <Route
          path="/dashboard/CreateRecipe"
          element={
            <IsPrivate>
              <CreateRecipePage />
            </IsPrivate>
          }
        />
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
