const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    try {
        if (!email || !password) return;
        const request = await fetch(`${apiUrl}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (request && request.status === 200) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export const registerUser = async (data) => {
    try {
        if (!data) return;
        const request = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (request && request.status === 201) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}


//CATEGORIAS
export const getCategories = async (jwt) => {
    try {
        if (!jwt) return;
        const request = await fetch(`${apiUrl}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (request && request.status === 200) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export const postCategory = async (jwt, data) => {
    try {
        if (!jwt) return;
        const request = await fetch(`${apiUrl}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        });
        if (request && request.status === 201) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteCategory = async (jwt, id) => {
    try {
        if (!jwt) return;
        const request = await fetch(`${apiUrl}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (request && request.status === 204) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

//CONTENT
export const getContent = async (jwt) => {
    try {
        if (!jwt) return;
        const request = await fetch(`${apiUrl}/content`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (request && request.status === 200) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export const postContent = async (jwt, data) => {
    try {
        if (!jwt) return;
        const request = await fetch(`${apiUrl}/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        });
        if (request && request.status === 201) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteContent = async (jwt, id) => {
    try {
        if (!jwt) return;
        const request = await fetch(`${apiUrl}/content/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });
        console.log(request);
        if (request && request.status === 204) {
            const result = await request.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}