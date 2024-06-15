import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleLogout = () => {
    setShowLogoutModal(true);
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#0b0a05" }}>
        <Toolbar>
          <h1>Desmadre yucateco</h1>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "770px" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Home" component={Link} to="/" />
                <Tab label="Perfil" component={Link} to="/Profile"/>
              </Tabs>
              {auth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} component={Link} to="/Login">Iniciar sesión</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/Register">Registro</MenuItem>
                    <MenuItem onClick={handleLogout}>Salir de sesión</MenuItem>
                  </Menu>
                </div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Modal
        open={showLogoutModal}
        onClose={handleCloseLogoutModal}
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="logout-modal-title" variant="h6" component="h2">
            Es necesario volver a iniciar sesión
          </Typography>
          <Typography id="logout-modal-description" sx={{ mt: 2 }}>
            Has cerrado sesión. Por favor, vuelve a iniciar sesión para continuar.
          </Typography>
          <Button
            onClick={handleCloseLogoutModal}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            component={Link} to="/Login"
          >
            Iniciar sesión
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Navbar;
