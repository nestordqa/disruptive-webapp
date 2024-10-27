import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerUser } from '../../utils/fetchinData';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        const registerAction = await registerUser(data);
        if (registerAction) {
            Swal.fire(
                '¡Excelente!',
                'Has creado exitosamente tu nuevo usuario',
                'success'
            )
            .then(() => navigate('/'))
            .catch((e) => console.error(e));
        }
    } catch (error) {
        Swal.fire(
            'Ups!',
            'Ocurrió un error creando tu usuario',
            'error'
        )
        .then(() => {})
        .catch(() => {});
        console.error(error);
    }
  };

  return (
    <div className="login-container">
        <div className="login-component-container">
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px' }} className='form-container'>
                    <Typography variant="h5" component="h1" align="center">
                        Crear Usuario
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FormControl fullWidth variant="outlined" margin="normal" required error={!!errors.role}>
                            <InputLabel>Rol</InputLabel>
                            <Select
                                {...register('role', { required: 'El rol es requerido' })}
                                label="Rol"
                            >
                            <MenuItem value="creador">Creador</MenuItem>
                            <MenuItem value="lector">Lector</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            errors && errors.role && errors.role.type === 'required' && <span className='error'>El rol es requerido</span>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Nombre de Usuario"
                            {...register('alias', { required: true })}
                        />
                        {
                            errors && errors.alias && errors.alias.type === 'required' && <span className='error'>El alias es requerido</span>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Correo Electrónico"
                            autoComplete="email"
                            {...register('email', { 
                            required: true, 
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Formato de correo electrónico inválido'
                            }
                            })}
                        />
                        {
                            errors && errors.email && errors.email.type === 'required' && <span className='error'>El email es requerido</span>
                        }
                        {
                            errors && errors.email && errors.email.type === 'pattern' && <span className='error'>El formato del email no es válido</span>
                        } 
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Contraseña"
                            type="password"
                            autoComplete="new-password"
                            {...register('password', { required: 'La contraseña es requerida' })}
                        />
                        {
                            errors && errors.password && errors.password.type === 'required' && <span className='error'>Tu contraseña es requerida</span>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                        >
                            Crear Usuario
                        </Button>
                    </form>
                </Paper>
            </Container>
            <Link to="/" className='link-style'>Regresar</Link>
        </div>
    </div>
  );
};

export default Register;