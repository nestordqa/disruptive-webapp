import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import useStore from '../../../../store/useStore';
import '../../../../styles/content.css';
import Swal from 'sweetalert2';
import { getRoleFromJWT } from '../../../../utils/common';

export const CategoryTable = () => {
    const [userRole, setUserRole] = useState(null);
    const { 
        categoriesData: initialCategories,
        deleteCategoriesData,
        jwt,
        filtering,
        filteredCategoriesData
    } = useStore();
    //eslint-disable-next-line
    const [contents, setContents] = useState(initialCategories);

    const handleDelete =  (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estás apunto de eliminar una categoría",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        })
        .then(async (result) => {
            if (result.isConfirmed) {
                await deleteCategoriesData(jwt, id);
            }
        })
        .catch((e) => console.error(e));

    }

    const handlePermissions = (permission) => {
        return permission ? 'Si' : 'No';
    }

    //eslint-disable-next-line
    useEffect(() => {
        setUserRole(getRoleFromJWT(jwt));
        if (filtering) {
            setContents(filteredCategoriesData)
        } else {
            setContents(initialCategories);
        }
        //eslint-disable-next-line
    }, [filtering, filteredCategoriesData])

    return (
        <TableContainer component={Paper} className='table-container'>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell><strong>Nombre</strong></TableCell>
                    <TableCell><strong>Permite imagenes</strong></TableCell>
                    <TableCell><strong>Permite videos</strong></TableCell>
                    <TableCell><strong>Permite textos</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {contents && contents?.length && contents?.map((content, index) => (
                        <TableRow key={index}>
                        <TableCell>{content?.name}</TableCell>
                        <TableCell>{handlePermissions(content.permissions.images)}</TableCell>
                        <TableCell>{handlePermissions(content.permissions.videos)}</TableCell>
                        <TableCell>{handlePermissions(content.permissions.texts)}</TableCell>
                        <TableCell>
                            {
                                userRole === 'admin' && <Button variant="contained" color="secondary" onClick={() => handleDelete(content._id)}>
                                    Eliminar
                                </Button>
                            }
                        </TableCell>
                        </TableRow>
                    ))}
                    {
                        (!contents || !contents.length) && <div className='no-content'> No hay contenidos para mostrar</div>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};