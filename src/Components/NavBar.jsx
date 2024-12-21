import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../assets/KARELA(1).png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { appTheme } from '../themes/theme';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Stack, Container, Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';

function Navbar() {
  const [currentPage, setCurrentPage] = useState('home');

  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const smallScreen = useMediaQuery(
    json2mq({
      maxWidth: 720,
    })
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    setOpen(false);
  }, []);

  return (
    <div
      id="nav-container"
      style={{
        backgroundColor: appTheme.palette.secondary.main,
        color: appTheme.palette.offwhite.main,
        width: '100vw',
      }}
    >
      <Container id="nav-links-wrapper">
        <Link
          to="/"
          id="home-wrapper"
          className="nav-element"
          onClick={() => setCurrentPage('/')}
        >
          <div id="home-link-logo-wrapper">
            <img id="logo" src={Logo} alt="Karela Logo" />
          </div>
          <h2 id="home-name">KARELA</h2>
        </Link>

        {!smallScreen && (
          <>
            <Link
              to="/recipes"
              className="nav-element"
              onClick={() => setCurrentPage('recipes')}
            >
              <h4
                className={
                  currentPage === 'recipes'
                    ? 'nav-heading selected-element'
                    : 'nav-heading'
                }
              >
                All Recipes
              </h4>
            </Link>

            <Link
              to="/FAQ"
              className="nav-element"
              onClick={() => setCurrentPage('FAQ')}
            >
              <h4
                className={
                  currentPage === 'FAQ'
                    ? 'nav-heading selected-element'
                    : 'nav-heading'
                }
              >
                FAQ
              </h4>
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="nav-element"
                  onClick={() => setCurrentPage('login')}
                >
                  <h4
                    className={
                      currentPage === 'login'
                        ? 'nav-heading selected-element'
                        : 'nav-heading'
                    }
                  >
                    Login
                  </h4>
                </Link>

                <Link
                  to="/signup"
                  className="nav-element"
                  onClick={() => setCurrentPage('signup')}
                >
                  <h4
                    className={
                      currentPage === 'signup'
                        ? 'nav-heading selected-element'
                        : 'nav-heading'
                    }
                  >
                    Sign Up
                  </h4>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link
                  to="/favorites"
                  className="nav-element"
                  onClick={() => setCurrentPage('favorites')}
                >
                  <h4
                    className={
                      currentPage === 'favorites'
                        ? 'nav-heading selected-element'
                        : 'nav-heading'
                    }
                  >
                    Favorites
                  </h4>
                </Link>

                <Link to="/dashboard" className="nav-element">
                  <h4 className="nav-heading">Dashboard</h4>
                </Link>
              </>
            )}

            <Link
              to="/"
              className="nav-element"
              onClick={() => {
                logOutUser();
                setCurrentPage('home');
              }}
            >
              <h4 className="nav-heading">Logout</h4>
            </Link>
          </>
        )}
        {smallScreen && (
          <>
            <Stack
              direction={'row'}
              sx={{
                width: '100%',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                aria-label="menu"
                sx={{
                  color: appTheme.palette.offwhite.main,
                  height: '80%',
                  width: '80%',
                }}
                onClick={handleOpen}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
            {open && (
              <>
                <Box
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{
                    position: 'absolute',
                    zIndex: 50,
                    top: 0,
                    padding: '4rem',
                    backdropFilter: 'blur(1px)',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      zIndex: 100,
                      width: '70vw',
                      height: '70vh',
                      backgroundColor: appTheme.palette.offwhite.main,
                      border: `1px solid ${appTheme.palette.secondary.main}`,
                      borderRadius: '4px',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Stack
                      direction={'column'}
                      spacing={2}
                      // sx={{ alignItems: 'center' }}
                    >
                      <Typography
                        variant="h4"
                        id="menu-title"
                        sx={{
                          color: 'black',
                          fontFamily: 'Edu AU VIC WA NT',
                          textAlign: 'center',
                          paddingTop: '2rem',
                        }}
                      >
                        Menu
                      </Typography>

                      <Link
                        to="/recipes"
                        className="nav-element"
                        onClick={() => setCurrentPage('recipes')}
                      >
                        <Typography
                          variant="h5"
                          className={
                            currentPage === 'recipes'
                              ? 'modal-link selected-element'
                              : 'modal-link'
                          }
                        >
                          All Recipes
                        </Typography>
                      </Link>
                      <Link
                        to="/FAQ"
                        className="nav-element"
                        onClick={() => setCurrentPage('FAQ')}
                      >
                        <Typography
                          variant="h5"
                          className={
                            currentPage === 'FAQ'
                              ? 'modal-link selected-element'
                              : 'modal-link'
                          }
                        >
                          FAQ
                        </Typography>
                      </Link>
                      {!isLoggedIn && (
                        <>
                          <Link
                            to="/login"
                            className="nav-element"
                            onClick={() => setCurrentPage('login')}
                          >
                            <Typography
                              variant="h5"
                              className={
                                currentPage === 'login'
                                  ? 'modal-link selected-element'
                                  : 'modal-link'
                              }
                            >
                              Login
                            </Typography>
                          </Link>

                          <Link
                            to="/signup"
                            className="nav-element"
                            onClick={() => setCurrentPage('signup')}
                          >
                            <Typography
                              variant="h5"
                              className={
                                currentPage === 'signup'
                                  ? 'modal-link selected-element'
                                  : 'modal-link'
                              }
                            >
                              Sign Up
                            </Typography>
                          </Link>
                        </>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Navbar;
