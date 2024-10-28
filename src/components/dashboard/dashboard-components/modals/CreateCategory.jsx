import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import useStore from '../../../../store/useStore';
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

export const CreateCategory = () => {
    const { postCategoriesData, categoriesData, jwt } = useStore();
    const [userRole, setUserRole] = useState(null);
    //eslint-disable-next-line
    const [userId, setUserId] = useState(null); 
    const [open, setOpen] = useState(false);
    //eslint-disable-next-line
    const [categories, setCategories] = useState([]);
    //eslint-disable-next-line
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const handleOpen = () => {
        setCategories(categoriesData);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const onSubmit = async (data) => {

        const obj = {
            name: data.name,
            permissions: {
                images: handleBoolean(data.images),
                videos: handleBoolean(data.videos),
                texts: handleBoolean(data.texts)
            }
        };

        await postCategoriesData(jwt, obj);
        handleClose();
    };

    const handleBoolean = (str) => str === 'true' ? true : false;

    useEffect(() => {
        setUserRole(getRoleFromJWT(jwt));
        setUserId(getIdFromJWT(jwt));
        //eslint-disable-next-line
    }, [])

    return (
        <>
            {
                (userRole === 'creador' || userRole === 'admin') && <Button variant="contained" color="primary" onClick={handleOpen} className='create-button'>
                    Crear categoría
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
                        Crear Categoria
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...register('name', { required: true })}
                            error={!!errors.name}
                            helperText={errors.name ? 'Este campo es requerido' : ''}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="type-label">Permisos: Imagenes</InputLabel>
                            <Controller
                                name="images"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        labelId="type-label"
                                        {...field}
                                        error={!!errors.type}
                                    >
                                        <MenuItem value="true">Si</MenuItem>
                                        <MenuItem value="false">No</MenuItem>
                                    </Select>
                                )}
                            />
                            {errors.images && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="type-label">Permisos: Videos</InputLabel>
                            <Controller
                                name="videos"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        labelId="video-label"
                                        {...field}
                                        error={!!errors.type}
                                    >
                                        <MenuItem value="true">Si</MenuItem>
                                        <MenuItem value="false">No</MenuItem>
                                    </Select>
                                )}
                            />
                            {errors.texts && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="type-label">Permisos: Textos</InputLabel>
                            <Controller
                                name="texts"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        labelId="texts-label"
                                        {...field}
                                        error={!!errors.texts}
                                    >
                                        <MenuItem value="true">Si</MenuItem>
                                        <MenuItem value="false">No</MenuItem>
                                    </Select>
                                )}
                            />
                            {errors.texts && <span style={{ color: 'red' }}>Este campo es requerido</span>}
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