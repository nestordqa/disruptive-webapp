import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import Swal from 'sweetalert2';
import { login } from '../../utils/fetchinData';
import useStore from '../../store/useStore';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { jwt, setJwt } = useStore();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const loginAction = await login(data.email, data.password);
            setJwt(loginAction.token);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Ups!',
                'Ocurrió un error iniciando sesión',
                'error'
            )
            .then(() => {})
            .catch(() => {});
        }
    };

    useEffect(() => {
        if (jwt) {
            navigate('/dashboard');
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div className="login-container">
            <div className="login-component-container">
                <Container component="main" maxWidth="xs">
                    <Paper elevation={3} style={{ padding: '20px' }} className='form-container'>
                        <Typography variant="h5" component="h1" align="center">
                            Iniciar Sesión
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                className='inputs-form'
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Correo Electrónico"
                                autoComplete="email"
                                autoFocus
                                {...register('email', { 
                                    required: true,
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Formato de correo electrónico no válido'
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
                                autoComplete="current-password"
                                {...register('password', { required: true })}
                            />
                            {
                                errors && errors.password && errors.password.type === 'required' && <span className='error'>Debes ingresar la contraseña</span>
                            }   
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '16px' }}
                            >
                                Iniciar Sesión
                            </Button>
                        </form>
                    </Paper>
                </Container>
                <span style={{
                    color: '#FFF',
                    fontWeight: 'bolder'
                }}>ó</span>
                <Link to="/register" className='link-style'>¡Crea tu cuenta aquí!</Link>
            </div>
        </div>
    );
};

export default Login;