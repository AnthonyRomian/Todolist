import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import usersAPI from "../services/usersAPI";

const RegisterPage = ({ history, params }) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // gestion des changements du form input
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };


    //gestion de la soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = { };
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas identique à votre mot de passe"
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire")
            return;
        }
        
        try {
            await usersAPI.register(user); 
            setErrors({});
            toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter !")
            history.replace("/login");
        } catch (error) {
            const { violations } = error.response.data;
            if (violations) {
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire")
        }
    }

    return (
        <>
            <div className="col-12 col-sm-6 col-xl-6 my-2 mx-auto">
                <h1 className="text-center">Inscription</h1>
            <form onSubmit={handleSubmit}>

                <Field
                    name="email"
                    label="Email"
                    placeholder="Votre adresse email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <Field
                    name="password"
                    label="Password"
                    placeholder="Votre mot de passe sécurisé"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <Field
                    name="passwordConfirm"
                    label="PasswordConfirm"
                    placeholder="Confirmez votre mot de passe"
                    type="password"
                    value={user.passwordConfirm}
                    onChange={handleChange}
                    error={errors.passwordConfirm}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success"  >Confirmation</button>
                </div>
            </form>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className=" fw-normal">
                    J'ai déja un compte,
                    <Link  to="/login" className="text-decoration-none fw-bold">
                      {` Je me connecte `}
                    </Link>
                  </span>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;