// register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUsuario } from "./api"; // Asegúrate de que `createUsuario` esté implementada en tu archivo `api.js`
import './styleLogin.css';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar si las contraseñas coinciden
        if (password !== passConfirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        try {
            // Intentar crear un nuevo usuario
            await createUsuario(username, password);
            alert("Usuario creado exitosamente.");
            navigate("/login"); // Redirigir al usuario a la página de login
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al crear el usuario.';
            console.error('Detalles del error:', error.response?.data || error.message);
            setError(errorMessage);
        }
    };

    return (
        <div className="login-page">
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <fieldset>
                    <div id="legend">
                        <legend>Registro</legend>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="username">Nombre de usuario</label>
                        <div className="controls">
                            <input type="text" id="username" name="username" placeholder="" className="input-xlarge"
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="password">Contraseña</label>
                        <div className="controls">
                            <input type="password" id="password" name="password" placeholder="" className="input-xlarge"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="password_confirm">Confirmar contraseña</label>
                        <div className="controls">
                            <input type="password" id="password_confirm" name="password_confirm" placeholder=""
                                   className="input-xlarge" onChange={(e) => setPassConfirm(e.target.value)}/>
                        </div>
                    </div>
                </fieldset>
                <button type="submit">Registrarme</button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Register;
