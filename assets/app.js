import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import './bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import {HashRouter, Route, Switch, withRouter} from "react-router-dom";
import HomePage from "./js/page/HomePage";
import Navbar from "./js/components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import TacheCreation from "./js/page/TacheCreation";
import PrivateRoute from "./js/components/PrivateRoute";
import LoginPage from "./js/page/LoginPage";
import RegisterPage from "./js/page/RegisterPage";
import AuthAPI from "./js/services/AuthAPI";
import AuthContext from "./js/contexts/AuthContext";
import TachesPage from "./js/page/TachesPage";
import TachePage from "./js/page/TachePage";

AuthAPI.setup();

const App = () => {


    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    const NavBarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter >
                <NavBarWithRouter/>
                <main className="container ">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/tache/:id" component={TachePage} />
                        <PrivateRoute path="/edit/:id" component={TacheCreation} />
                        <PrivateRoute path="/taches" component={TachesPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>

    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
