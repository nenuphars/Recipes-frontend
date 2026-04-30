import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import Loading from './Loading.jsx';

// ** is anonymous
// everything wrapped in this component:
// only show children if * not logged in *
// --> users should not be able to reach login page when logged in.

type Props = { children: any };

function IsAnon(props: Props) {
  const { isLoggedIn, isLoading } = useAuth();
  console.log('IsAnon component loaded');

  if (isLoading) return <Loading />;

  //    navigate to home if logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
    // return children if anonymous
  } else {
    return props.children;
  }
}

export default IsAnon;
