import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import useStore from '../../../../store/useStore';
import '../../../../styles/content.css';
import Swal from 'sweetalert2';

export const ContentTable = () => {
    const { 
        contentData: initialContents,
        deleteContentData,
        jwt
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
        .then((result) => {
            if (result.isConfirmed) {
                deleteContentData(jwt, id);
            }
        })
        .catch((e) => console.error(e));

    }

    useEffect(() => {
    })

    return (
        <TableContainer component={Paper} className='table-container'>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>User</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>URL</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {contents && contents?.length && contents?.map((content, index) => (
                        <TableRow key={index}>
                        <TableCell>{content.title}</TableCell>
                        <TableCell>{content.category.name ?? content.category }</TableCell>
                        <TableCell>{content.user.alias ?? content.user }</TableCell>
                        <TableCell>{content.type}</TableCell>
                        <TableCell><a href={content.url} target="_blank" rel="noopener noreferrer">{content.url}</a></TableCell>
                        <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(content._id)}>
                            Eliminar
                            </Button>
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