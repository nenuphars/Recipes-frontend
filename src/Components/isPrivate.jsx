import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
// import { Navigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import NoAccess from './NoAccess.jsx';

// ** is private
// everything wrapped in this component:
// only show children if * logged in *
// --> users should only be able to reach privtae pages when logged in.

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  console.log("IsPrivate component loaded")

  if (isLoading) return <Loading />;

  // if logged in, show the content
  if (isLoggedIn) {
    return props.children;
    // if not logged in, navigate to login page
  } else {
    return <NoAccess />;
  }
}

export default IsPrivate;
