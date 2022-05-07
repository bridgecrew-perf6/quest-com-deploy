import React, { useContext, useState, useEffect } from 'react';
import { MenuItem, Tooltip, Button, Avatar, Container, 
    AppBar, Box, Toolbar, IconButton, Typography, Menu} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import StudentIcon from '../assets/img/avartar-student.png';

import { AuthContext } from '../store/Contexts/AuthContext';
import { Logout } from '../store/Actions/AuthAction';
import { Link } from 'react-router-dom';

import NavbarLogo from '../assets/img/logo-questcom.png';


const pages = ['Home', 'About', "Github"];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user, AuthDispatch } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu()
    AuthDispatch(Logout());
  }

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // const controlNavbar = () => {
  //   if (typeof window !== 'undefined') { 
  //     if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
  //       setShow(false); 
  //     } else { // if scroll up show the navbar
  //       setShow(true);  
  //     }

  //     // remember current page location to use in the next move
  //     setLastScrollY(window.scrollY); 
  //   }
  // };

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('scroll', controlNavbar);

  //     // cleanup function
  //     return () => {
  //       window.removeEventListener('scroll', controlNavbar);
  //     };
  //   }
  // }, [lastScrollY]);

  

  return (
    <AppBar position="static" style={{ display: show ? 'flex' : 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Avatar alt="Quest Com Logo" src={NavbarLogo} sx={{
            display: { xs: 'none', md: 'flex' },
            mr: 1,
        }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={'secondary'}
            fontWeight="bold"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            QuestCom
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        { user ? (
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={StudentIcon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} component={Link} to="/login">
                <Typography textAlign="center" >Logout</Typography>
            </MenuItem>
             
            </Menu>
          </Box> ): (
              <Box sx={{
                flexGrow: 0,
                display: { xs: 'flex' },
                textDecoration: 'none'
              }} component={Link} to="/login" >
                
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Login
                    </Button>
               
                </Box>
             )
            }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;