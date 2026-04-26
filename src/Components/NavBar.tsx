import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Stack, Typography, Box, useTheme, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import json2mq from 'json2mq';
import { useAuth } from '../context/auth.context.jsx';
import { appTheme } from '../themes/theme.js';
import { Menu } from '@mui/icons-material';
import './NavBar.css';

function Navbar() {
  const [currentPage, setCurrentPage] = useState('home');

  const { isLoggedIn, logOutUser } = useAuth();
  const theme = useTheme();

  const smallScreen = useMediaQuery(
    json2mq({
      maxWidth: 720,
    }),
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
    <Box
      id="nav-container"
      style={{
        backgroundColor: appTheme.palette.secondary.main,
        width: '100vw',
        position: 'relative',
      }}
    >
      <Box id="nav-links-wrapper">
        <Link
          to="/"
          id="home-wrapper"
          style={{
            textDecoration: 'none',
            color: theme.palette.primary.main,
          }}
          className="nav-element"
          onClick={() => setCurrentPage('/')}
        >
          <Container
            sx={{
              width: 'auto',
              minWidth: '200px',
              // height: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              lineHeight: 0,
              marginRight: '2rem',
              left: 0,
              alignSelf: 'start',
            }}
          >
            <Box id="home-link-logo-wrapper">
              <img
                id="logo"
                style={{
                  objectFit: 'cover',
                  maxWidth: '5rem',
                  alignSelf: 'start',
                }}
                src={'src/assets/Karela(1).png'}
                alt="Karela Logo"
              />
            </Box>
            <Typography variant="h5" id="home-name">
              KARELA
            </Typography>
          </Container>
        </Link>

        {!smallScreen && (
          <Box className="nav-links-right">
            <Link
              to="/recipes"
              className="nav-element"
              onClick={() => setCurrentPage('recipes')}
            >
              <Typography
                variant="h5"
                className={
                  currentPage === 'recipes'
                    ? 'nav-heading selected-element'
                    : 'nav-heading'
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
                    ? 'nav-heading selected-element'
                    : 'nav-heading'
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
                        ? 'nav-heading selected-element'
                        : 'nav-heading'
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
                        ? 'nav-heading selected-element'
                        : 'nav-heading'
                    }
                  >
                    Sign Up
                  </Typography>
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
                  <Typography
                    variant="h5"
                    className={
                      currentPage === 'favorites'
                        ? 'nav-heading selected-element'
                        : 'nav-heading'
                    }
                  >
                    Favorites
                  </Typography>
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setCurrentPage('dashboard')}
                  className="nav-element"
                >
                  <Typography
                    variant="h5"
                    className={
                      currentPage === 'dashboard'
                        ? 'nav-heading selected-element'
                        : 'nav-heading'
                    }
                  >
                    Dashboard
                  </Typography>
                </Link>
                <Link
                  to="/"
                  className="nav-element"
                  onClick={() => {
                    logOutUser();
                    setCurrentPage('home');
                  }}
                >
                  <Typography variant="h5" className="nav-heading">
                    Logout
                  </Typography>
                </Link>
              </>
            )}
          </Box>
        )}
        {smallScreen && (
          <>
            <Box
              sx={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <IconButton
                size="large"
                aria-label="menu"
                sx={{
                  height: '80%',
                  width: '80%',
                }}
                onClick={handleOpen}
              >
                <Menu />
              </IconButton>
            </Box>

            {open && (
              <>
                <Stack
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{
                    position: 'absolute',
                    zIndex: 50,
                    top: 0,
                    margin: 0,
                    padding: 0,
                    backdropFilter: 'blur(1px)',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Stack
                    sx={{
                      zIndex: 100,
                      width: '80vw',
                      height: '60vh',
                      border: `1px solid ${appTheme.palette.secondary.main}`,
                      borderRadius: '4px',
                      backgroundColor: theme.palette.background.default,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Stack
                      direction={'column'}
                      spacing={2}
                      sx={{ alignItems: 'center' }}
                    >
                      <Typography
                        variant="h4"
                        id="menu-title"
                        sx={{
                          color: 'black',
                          fontFamily: 'Edu AU VIC WA NT',
                          textAlign: 'center',
                          paddingTop: '2rem',
                          textDecoration: 'underline',
                        }}
                      >
                        Menu
                      </Typography>

                      <Link
                        to="/"
                        className="nav-element"
                        onClick={() => {
                          setCurrentPage('home');
                          handleClose();
                        }}
                      >
                        <Typography
                          variant="h5"
                          className={
                            currentPage === 'home'
                              ? 'modal-link selected-element'
                              : 'modal-link'
                          }
                        >
                          Home
                        </Typography>
                      </Link>

                      <Link
                        to="/recipes"
                        className="nav-element"
                        onClick={() => {
                          setCurrentPage('recipes');
                          handleClose();
                        }}
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
                        onClick={() => {
                          setCurrentPage('FAQ');
                          handleClose();
                        }}
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
                      {isLoggedIn && (
                        <>
                          <Link
                            to="/dashboard"
                            className="nav-element"
                            onClick={() => {
                              setCurrentPage('dashboard');
                              handleClose();
                            }}
                          >
                            <Typography
                              variant="h5"
                              className={
                                currentPage === 'dashboard'
                                  ? 'modal-link selected-element'
                                  : 'modal-link'
                              }
                            >
                              Dashboard
                            </Typography>
                          </Link>
                          <Link
                            className="nav-element"
                            to={'/'}
                            onClick={() => {
                              logOutUser();
                              setCurrentPage('home');
                              handleClose();
                            }}
                          >
                            <Typography variant="h5" className="modal-link">
                              Logout
                            </Typography>
                          </Link>
                        </>
                      )}
                      {!isLoggedIn && (
                        <>
                          <Link
                            to="/login"
                            className="nav-element"
                            onClick={() => {
                              setCurrentPage('login');
                              handleClose();
                            }}
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
                            onClick={() => {
                              setCurrentPage('signup');
                              handleClose();
                            }}
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
                  </Stack>
                </Stack>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
