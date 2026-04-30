import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import axiosInstance from '../services/axios';

interface User {
  _id: string;
  user_name: string;
}

interface AuthContextType {
  user?: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  setToken: (token: string, user: User) => void;
  removeToken: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On app load, verify the token is still valid
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    axiosInstance
      .get<User>('/auth/verify') // adjust to your actual verify endpoint
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setIsLoading(false));
  }, []);

  const setToken = (token: string, user: User) => {
    localStorage.setItem('authToken', token);
    setUser(user);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isLoading, setToken, removeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
