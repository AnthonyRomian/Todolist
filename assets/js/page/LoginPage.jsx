import React, { useState, useContext } from 'react';
import Field from '../components/forms/Field';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/AuthAPI';
import {  toast } from 'react-toastify';
import {Link} from "react-router-dom";



const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    // gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;

        // [name] il remplacera la valeur du credential
        setCredentials({ ...credentials, [name]: value });
    };

    //gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            console.log(credentials);
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté !")
            history.replace("/taches");
        } catch (error) {
            setError("Aucun compte ou les informations sont erronées");
            toast.error("Une erreur est survenue !")
        }
    };

    return (
        <>
                <h1 className="text-center">Connexion</h1>

                <form onSubmit={handleSubmit} >
                    <Field
                        className=""
                        label="Adresse email"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Adresse email de connexion"
                        error={error} />

                    <Field
                        label="Mot de passe"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        error="" />

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-success" >
                            Je me connecte
                        </button>
                    </div>
                </form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className=" fw-normal">
                    Vous n'avez pas de compte
                    <Link  to="/register" className="text-decoration-none fw-bold">
                      {` Créer un compte `}
                    </Link>
                  </span>
                </div>

        </>
    )
}

export default LoginPage;