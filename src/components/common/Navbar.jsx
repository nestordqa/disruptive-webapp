import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/dashboard.css';
import useStore from '../../store/useStore';
import Swal from 'sweetalert2';

export const Navbar = () => {
    const location = useLocation();
    const { setJwt, filterContentData, filterCategoriesData, setFiltering } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleLogout = () => {
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

    const handleChange = (event) => {
        const value = event.target.value;
        if (!value || value === '') {
            setFiltering(false);
            setSearchTerm('');
            return;
        } else {
            setFiltering(true);
        }
        setSearchTerm(value);
        if (location.pathname === '/dashboard/categories') {
            filterCategoriesData(value);
        } else {
            filterContentData(value);
        }
    };

    useEffect(() => {
        setSearchTerm('');
        setFiltering(false);
        //eslint-disable-next-line
    }, [location])

    return (
        <AppBar position="static" className='navbar'>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Disruptive Web App
                </Typography>
                
                {/* Search Bar */}
                <TextField
                    variant="outlined"
                    placeholder="Buscar..."
                    onChange={handleChange}
                    size="small"
                    value={searchTerm}
                    style={{ margin: '0 20px', backgroundColor: 'white', borderRadius: '4px' }}
                />
                
                <Button color="inherit" component={Link} to="/dashboard/categories">
                    Categorías
                </Button>
                <Button color="inherit" component={Link} to="/dashboard/content">
                    Contenido
                </Button>
                <Button color="inherit" component={Link} onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Toolbar>
        </AppBar>
    );
};