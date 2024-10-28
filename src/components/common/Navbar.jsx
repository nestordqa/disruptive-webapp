import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css';
import useStore from '../../store/useStore';
import Swal from 'sweetalert2';

export const Navbar = () => {
    const { setJwt } = useStore();
    const handleLogout =  () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estás apunto de cerrar sesión",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if (result.isConfirmed) {
                setJwt(null);
                window.location.reload();
            }
        })
        .catch((e) => console.error(e));

    }
  return (
    <AppBar position="static" className='navbar'>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Disruptive Web App
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard/categories">
            Categories
        </Button>
        <Button color="inherit" component={Link} to="/dashboard/content">
            Content
        </Button>
        <Button color="inherit" component={Link} onClick={handleLogout}>
            Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};
