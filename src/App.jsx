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
import IsAnon from './Components/IsAnon';
import IsPrivate from './Components/IsPrivate';

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
