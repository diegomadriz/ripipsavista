import axios from 'axios';

// Configura la URL base para todas las solicitudes
const API_URL = 'http://10.34.10.206:3000';

// Obtener todos los EscenaObjetos
const getEscenaObjetos = async () => {
    const response = await axios.get(`${API_URL}/escenaObjetos`);
    console.log(response.data);
    return response.data;
};


// Crear un EscenaObjeto
const createEscenaObjeto = async (escena_id, objeto_id, posicion, escala, rotacion) => {
    const response = await axios.post(`${API_URL}/escenaObjetos`, {
        escena_id, objeto_id, posicion, escala, rotacion
    });
    console.log(response.data);
    return response.data;
}

// Actualizar un EscenaObjeto
const updateEscenaObjeto = async (id, posicion, escala, rotacion) => {
    const response = await axios.put(`${API_URL}/escenaObjetos/${id}`, {
        posicion, escala, rotacion
    });
    console.log(response.data);
    return response.data;
};

// Eliminar un EscenaObjeto
const deleteEscenaObjeto = async (id) => {
    const response = await axios.delete(`${API_URL}/escenaObjetos/${id}`);
    console.log(response.data);
    return response.data;
};

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

export{
    getEscenaObjetos,
    createEscenaObjeto,
    updateEscenaObjeto,
    deleteEscenaObjeto,
    getUrlPorId,
    getEscenaObjetosPorEscenaId
};

