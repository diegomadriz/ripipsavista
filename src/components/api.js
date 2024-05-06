import axios from 'axios';

// Configura la URL base para todas las solicitudes
const API_URL = 'http://192.168.1.99:3001';

// Obtener todos los EscenaObjetos
const getEscenaObjetos = async () => {
    const response = await axios.get(`${API_URL}/escenaObjetos`);
    console.log(response.data);
    return response.data;
};


// Crear un EscenaObjeto
const createEscenaObjeto = async (escena_id, objeto_id, position, scale, rotation) => {
    const response = await axios.post(`${API_URL}/escenaObjetos`, {
        escena_id, objeto_id, position, scale, rotation
    });
    console.log(response.data);
    return response.data;
}

const createEscena = async (usuario_id, descripcion) => {
    try {
        const response = await axios.post(`${API_URL}/escena`, { usuario_id, descripcion });
        return response.data.newEscenaID; // Devuelve el ID directamente
    } catch (error) {
        console.error('Error al crear la escena:', error);
        throw error;
    }
};

// Actualizar un EscenaObjeto

// Obtener URL por ID de objeto
const getUrlPorId = async (objetoId) => {
    const response = await axios.get(`${API_URL}/objetos/${objetoId}/url`);
    //console.log(response.data);
    return response.data;
};

// Obtener EscenaObjetos por ID de Escena
const getEscenaObjetosPorEscenaId = async (escenaId) => {
    const response = await axios.get(`${API_URL}/escenaObjetos/por-escena/${escenaId}`);
    console.log(response.data);
    return response.data;
};


const createUsuario = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        // Mostrar detalles del error
        console.error('Error al crear el usuario:', error.response?.data || error.message);
        throw error;
    }
};

// Función para autenticar usuarios
const autenticarUsuario = async (username, password) => {
    try {
        // Usa POST y envía los datos como JSON
        const response = await axios.post(`${API_URL}/usuarios/login`, {
            username,
            password
        });
        return response.data; // Devuelve la respuesta del backend
    } catch (error) {
        console.error('Error al autenticar:', error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

async function getEscenasPorUsuarioId(usuarioId) {
    try {
        const response = await axios.get(`${API_URL}/escenas/usuario/${usuarioId}`);
        return response.data;
        // Devuelve los datos obtenidos
    } catch (error) {
        console.error('Error al obtener escenas por usuario:', error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo
    }
}

//--------------------------------------------------------------------------------------------------------------
//GITHUB
// htmlUpdater
const githubUsername = 'PedroRdlPG';
const githubRepo = 'ar-scene';
const githubToken = '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';

async function getRepoContents(path) {
    try {
        const response = await axios.get(`https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${path}`, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting repository contents:', error);
        throw error;
    }
}

async function commitFile(path, content) {
    try {
        const currentFile = await getRepoContents(path);
        const sha = currentFile.sha;

        const encodedContent = btoa(unescape(encodeURIComponent(content)));

        const response = await axios.put(`https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/${path}`, {
            message: `Update ${path}`,
            content: encodedContent,
            sha: sha
        }, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al confirmar el archivo:', error);
        throw error;
    }
}

async function updateRepo(path, newContent) {
    try {
        return await commitFile(path, newContent);
    } catch (error) {
        console.error('Error updating repo:', error);
        throw error;
    }
}

export {
    getEscenaObjetos,
    createEscenaObjeto,
    getUrlPorId,
    getEscenaObjetosPorEscenaId,
    autenticarUsuario,
    createUsuario,
    createEscena,
    updateRepo,
    getEscenasPorUsuarioId
};