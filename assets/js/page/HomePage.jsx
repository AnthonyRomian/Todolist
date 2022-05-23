import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/AuthAPI";
import {toast} from "react-toastify";

const HomePage = (props) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    // deconnexion
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté !")
        history.push("/login");
    };

    return (
        <>

            <div className="py-3 mx-1">
                <h1>Todo list</h1>
                <p>Si vous voulez essayer TODO List App alors créer un compte ou connectez vous !</p>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (<>
                        <li className="nav-item">
                            <NavLink to="/register" className="btn btn-info">Inscription</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                        </li>
                    </>)) || (
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-danger">Deconnexion</button>
                        </li>
                    )}
                </ul>
            </div>
        </>


    );
}

export default HomePage;