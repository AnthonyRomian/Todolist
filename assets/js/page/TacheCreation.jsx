import React, {useEffect, useState} from "react";
import Field from "../components/forms/Field";
import Checkbox from "../components/forms/Checkbox";
import 'bootstrap/dist/css/bootstrap.css';
import {toast} from 'react-toastify';
import todolistsAPI from "../services/todolistsAPI";
import {Link} from "react-router-dom";

const TacheCreation = (props) => {

    const [editing, setEditing] = useState(false);
    const [Checked, setChecked] = useState(false);
    const {id = "new"} = props.match.params;

    const [tache, setTache] = useState({
        titre: "",
        description: "",
        status: false

    });

    const [errors, setErrors] = useState({
        titre: "",
        description: "",
        status: ""
    });

    // recup facture
    const fetchTask = async id => {
        try {
            const {titre, description, status} = await todolistsAPI.find(id);
            setTache({titre, description, status});
        } catch (error) {
            toast.error("Impossible de charger la tache demandée");
            history.replace("/taches");
        }
    };

    useEffect(() => {
        if (id !== "new") {
            fetchTask(id);
            setEditing(true);
        }
    }, [id]);


    // gestion des changements du form input
    const handleChange = ({currentTarget}) => {

        const {name, value} = currentTarget;
        setTache({...tache, [name]: value});
    };

    // gestion des changements du checkbox input
    const handleChangeTest = (event) => {
        setChecked(!Checked);
        const name = event.target.name;
        const value = !Checked;
        setTache({...tache, [name]: value});
    };


    //gestion de la soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                await todolistsAPI.update(id, tache);
                toast.success("La tache à bien modifiée");
            }
            if (!editing) {
                await todolistsAPI.create(tache);
                toast.success("La tache à bien été crée");
                props.history.replace("/taches");
            }
        } catch (error) {
            console.log(error);
            const {violations} = error.response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire");
            }
        }
    };

    return (

        <div className="py-3 mx-1">
            {(editing && <h1>Modification d'une tache</h1>) || (<h1>Création d'une tache</h1>)}
            <form onSubmit={handleSubmit} className="row">
                <Field
                    name="titre"
                    label="titre"
                    placeholder="Votre titre"
                    value={tache.titre}
                    onChange={handleChange}
                    error={errors.titre}
                />
                <Field
                    name="description"
                    label="description"
                    placeholder="Votre description"
                    value={tache.description}
                    onChange={handleChange}
                    error={errors.description}
                />
                <Checkbox
                    name="status"
                    label="Votre tache est elle terminée11111 ?"
                    error={errors.status}
                    onChange={handleChangeTest}
                    value={Checked}/>


                <div className="form-group">
                    <button type="submit" className="btn btn-primary mt-3 col-6">Enregistrer</button>
                    <Link
                        to={"/taches/"}
                        className="btn  btn-info mt-3 col-6 ">Retour à la liste</Link>
                </div>


            </form>

        </div>
    );
};

export default TacheCreation;