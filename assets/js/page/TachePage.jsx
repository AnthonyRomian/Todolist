import React, {useContext, useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import {toast} from 'react-toastify';
import todolistsAPI from "../services/todolistsAPI";
import {Link} from "react-router-dom";
import CardContentLoader from "../components/loaders/CardContentLoader";


const TachePage = (props) => {
    const [loading, setLoading] = useState(true);

    const [tache, setTache] = useState({
        id: "",
        titre: "",
        description: "",
        status: false

    });
    const id = props.match.params.id

    // recup tache
    const fetchTask = async id => {
        try {
            const data = await todolistsAPI.find(id);
            setTache(data);
            setLoading(false)
        } catch (error) {
            toast.error("Impossible de charger la tache demandée");
            history.replace("/taches");
        }
    };

    // reload les taches lorsque l id est donné
    useEffect(() => {
        fetchTask(id);
    }, []);

    return (
        <>
            {!loading &&
            <div className=" card col-6 text-justify-center mt-3 mx-auto">
                <h2 className="card-header text-center section-heading  font-link">{tache.id}</h2>
                <div className="timeline card-body">
                    <div className="row">
                        <div className="col background-white">
                            <div className="clearfix">
                                <div className="font-link ">
                                    <h4 className="color-3 text-center fs-3">Titre : {tache.titre}</h4>
                                </div>
                                <div className="timeline-heading text-center font-link">
                                    <p>Description : {tache.description}
                                    </p>
                                    <h4>Status : <input readOnly={true} type="checkbox"
                                                        checked={tache.status ? true : false}></input></h4>
                                    <div className="form-group">
                                        <Link
                                            to={"/taches/"}
                                            className="btn  btn-info mt-3 col-6 ">Retour à la liste</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {loading && <CardContentLoader className="mt-3" />}
        </>


    );
}

export default TachePage;