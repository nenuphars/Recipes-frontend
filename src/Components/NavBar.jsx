import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Home
                </Link>
              </Typography>


      
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/Allrecipes"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  All Recipes
                </Link>
              </Typography>


            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
