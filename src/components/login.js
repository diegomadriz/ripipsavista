import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { autenticarUsuario } from "./api";

function Login({ handleAuthentication }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await autenticarUsuario(username, password);
            if (response && response.success) {
                console.log("Usuario autenticado:", response.user.id);

                // Proporciona tanto la clave como el valor en setItem
                localStorage.setItem('userId', response.user.id);

                handleAuthentication(true);
                navigate("/home");
            } else {
                setError("Credenciales incorrectas.");
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error); // Imprime el error en la consola para una mejor comprensión
            setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="login-page">
            <form id="login-form" className="form" onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <legend>Iniciar sesión</legend>
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
                </fieldset>
                <button type="submit">Iniciar sesión</button>
                <div id="register-link">
                    <button type="button" onClick={() => navigate("/register")}>Crear cuenta nueva</button>
                </div>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Login;