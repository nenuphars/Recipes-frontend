import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.context.jsx';
import { RecipeProviderWrapper } from './context/recipe.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RecipeProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipeProviderWrapper>
  </AuthProvider>,
);
