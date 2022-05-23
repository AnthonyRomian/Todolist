import React, { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import {toast} from "react-toastify";
import AuthContext from "../contexts/AuthContext";

const Navbar = (props) => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes désormais déconnecté !")
    history.push("/login");
  };


  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">logo</NavLink>
          <button onClick={handleNavCollapse} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}  id="navbarColor02" >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/taches">TODO List</NavLink>
              </li>

            </ul>
            <ul className="navbar-nav ml-auto">
              {(!isAuthenticated && (<>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Inscription</NavLink>
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
        </div>
      </nav>

  );
}

export default Navbar;