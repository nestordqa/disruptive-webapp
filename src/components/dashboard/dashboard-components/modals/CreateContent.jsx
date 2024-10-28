import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import useStore from '../../../../store/useStore';
import Swal from 'sweetalert2';
import '../../../../styles/content.css';
import { getIdFromJWT, getRoleFromJWT } from '../../../../utils/common';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CreateContent = () => {
    const { postContentData, categoriesData, jwt } = useStore();
    const categorias = [
        {
            name: 'Videos',
            value: 'video'
        },
        {
            name: 'Imagenes',
            value: 'image'
        },
        {
            name: 'texts',
            value: 'text'
        }
    ];
    const [catRender, setCatRender] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            category: null
        }
    });

    const handleOpen = () => {
        if (!categoriesData?.length) {
            Swal.fire(
                'Ups!',
                'Para poder crear un contenido, debes crear al menos una categoría',
                'error'
            );
            return;
        }
        setCategories(categoriesData);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const onSubmit = async (data) => {
        const obj = {
            ...data,
            category: categoryId,
            user: userId
        };
        await postContentData(jwt, obj);
        // Here you can handle the form submission, e.g., call postContentData
        handleClose();
    };

    const handleSelect = (e) => {
        if (!e) return;
        let filter = categories.filter((item) => item._id === e.target.value);
        filter = filter[0];
        //eslint-disable-next-line
        const newCats = categorias.filter((item) => {
            if (item.value === 'video') {
                if (filter.permissions.videos) {
                    return item;
                }
            }
            if (item.value === 'image') {
                if (filter.permissions.images) {
                    return item;
                }
            }
            if (item.value === 'text') {
                if (filter.permissions.texts) {
                    return item;
                }
            }
        });
        setCatRender(newCats);
        setCategoryId(filter._id);
    }

    useEffect(() => {
        setUserRole(getRoleFromJWT(jwt));
        setUserId(getIdFromJWT(jwt));
        //eslint-disable-next-line
    }, [])

    return (
        <>
            {
                (userRole === 'creador' || userRole === 'admin') && <Button variant="contained" color="primary" onClick={handleOpen} className='create-button'>
                    Crear contenido
                </Button>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Crear Contenido
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Título"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('title', { required: true })}
                            error={!!errors.title}
                            helperText={errors.title ? 'Este campo es requerido' : ''}
                        />
                        <TextField
                            label="URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('url', { required: true })}
                            error={!!errors.url}
                            helperText={errors.url ? 'Este campo es requerido' : ''}
                        />
                        <FormControl fullWidth margin="normal">
                                    
                                <select onChange={handleSelect}
                                    style={{
                                        height: '55px',
                                        padding: '10px',
                                        border: 'solid 1px #B2B2B2',
                                        borderRadius: '0.2em'
                                    }}
                                >
                                    {categories && categories.length > 0 && categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="type-label">Tipo</InputLabel>
                            <Controller
                                name="type"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        labelId="type-label"
                                        {...field}
                                        error={!!errors.type}
                                    >
                                        {
                                            catRender && catRender.map((item, index) => <MenuItem key={index} value={item.value} >{item.name}</MenuItem>)
                                        }
                                    </Select>
                                )}
                            />
                            {errors.type && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Crear
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mt: 2, ml: 1 }}>
                            Cerrar
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};