import { Navigate } from 'react-router-dom';
import Loading from './Loading';
import { useAuth } from '../context/auth.context';
import type { ReactNode } from 'react';

interface IsPrivateProps {
  children: ReactNode;
}

function IsPrivate({ children }: IsPrivateProps) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <Loading />;
  if (isLoggedIn) return <>{children}</>;

  return <Navigate to="/login" replace />; // replaces NoAccess with a redirect
}

export default IsPrivate;
