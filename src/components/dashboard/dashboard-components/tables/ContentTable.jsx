import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import useStore from '../../../../store/useStore';
import '../../../../styles/content.css';
import Swal from 'sweetalert2';
import { getRoleFromJWT } from '../../../../utils/common';

export const ContentTable = () => {
    const [userRole, setUserRole] = useState(null);
    const { 
        contentData: initialContents,
        deleteContentData,
        jwt,
        filtering,
        filteredContentData
    } = useStore();
    //eslint-disable-next-line
    const [contents, setContents] = useState(initialContents);

    const handleDelete =  (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estás apunto de eliminar un contenido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                await deleteContentData(jwt, id);
            }
        })
        .catch((e) => console.error(e));

    }

    //eslint-disable-next-line
    useEffect(() => {
        setUserRole(getRoleFromJWT(jwt));
        if (filtering) {
            setContents(filteredContentData)
        } else {
            setContents(initialContents);
        }
        //eslint-disable-next-line
    }, [filtering, filteredContentData])

    return (
        <TableContainer component={Paper} className='table-container'>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell><strong>Título</strong></TableCell>
                    <TableCell><strong>Categoría</strong></TableCell>
                    <TableCell><strong>Usuario</strong></TableCell>
                    <TableCell><strong>Tipo</strong></TableCell>
                    <TableCell><strong>URL</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {contents && contents?.length && contents?.map((content, index) => (
                        <TableRow key={index}>
                        <TableCell>{content.title ?? 'No existe el titulo'}</TableCell>
                        <TableCell>{content.category?.name ?? 'No hay categoria' }</TableCell>
                        <TableCell>{content.user?.alias ?? content.user ?? null}</TableCell>
                        <TableCell>{content.type}</TableCell>
                        <TableCell><a href={content.url} target="_blank" rel="noopener noreferrer">{content.url ?? null}</a></TableCell>
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