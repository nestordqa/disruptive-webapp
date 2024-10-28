export const getRoleFromJWT = (token) => {
    // Verificamos que el token esté presente
    if (!token) {
        return;
    }

    // Dividimos el token en sus partes
    const parts = token.split('.');
    if (parts.length !== 3) {
        return;
    }

    // Decodificamos la parte del payload
    const payload = JSON.parse(atob(parts[1]));

    // Retornamos el rol si existe
    return payload.role || null;
}

export const getIdFromJWT = (token) => {
    // Verificamos que el token esté presente
    if (!token) {
        return;
    }

    // Dividimos el token en sus partes
    const parts = token.split('.');
    if (parts.length !== 3) {
        return;
    }

    // Decodificamos la parte del payload
    const payload = JSON.parse(atob(parts[1]));

    // Retornamos el ID si existe
    return payload.id || null;
}