import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { RecipeProviderWrapper } from './context/recipe.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProviderWrapper>
    <RecipeProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipeProviderWrapper>
  </AuthProviderWrapper>
);
