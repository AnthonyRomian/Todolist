import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import todolistsAPI from "../services/todolistsAPI";
import { toast} from 'react-toastify';
import TableLoader from "../components/loaders/TableLoader";


const TachesPage = (props) => {
    const [todoLists, setTodoLists] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 8;

    const [tache, setTache] = useState({
        id: "",
        titre: "",
        description: "",
        status: ""
    });

    const [error, setError] = useState({
        id: "",
        titre: "",
        description: "",
        status: ""
    });

    const STATUS_CLASSES = {
        false: "secondary",
        true: "success",
    }

    const STATUS_LABELS = {
        false: "En cours",
        true: "Terminée",
    }

    // recuperation des taches
    const fetchTodoList = async () => {
        try {
            const data = await todolistsAPI.findAll();
            setTodoLists(data);
            setLoading(false);
        } catch {
            toast.error("Une erreur et survenue lors de la TODO list");
        }
    };

    // lors du load recup des taches
    useEffect(() => {
        fetchTodoList();
    }, []);

    // supprimer une tache
    const handleDelete = async id => {

        const originalTask = [...todoLists];

        // 1 approche optimiste ( probleme si serveur down )
        setTodoLists(todoLists.filter(todolist => todolist.id !== id));

        // 1 approche pessimiste ( alors solution avec copie de tableau )
        try {
            await todolistsAPI.delete(id);
            toast.success("La facture à bien été supprimée");

        } catch (error) {
            setTodoLists(originalTask);
            toast.error("Une erreur est survenue");

        }
    };

    // terminer la tache -> status = terminée
    const handleEndTask = async (id) => {
        const originalEndTask = [...todoLists];
        let task = {
            id: "",
            titre: "",
            description: "",
            status: ""
        }

        //trouver la tache a modifier status
        try {
            task = await todolistsAPI.find(id);
            console.log(task);

        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue");
        }

        // update de la tache
        try {
            task.status = true;
            await todolistsAPI.update(id, task);
            setTodoLists(todoLists.filter(todolist => todolist.id !== id).concat(task));
            toast.success("La tache à bien modifiée");
            props.history.replace("/taches");

        } catch (error) {
            setTodoLists(originalEndTask);
            const violations = error.response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Une erreur est survenue");
            }

        }

    };

    return (
        <>
            <div className="py-3 mx-1">
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h1>Todo List</h1>
                    <Link className="btn btn-primary" to="/edit/new">Créer une nouvelle tache</Link>
                </div>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>titre</th>
                        <th className='text-center'>Status</th>
                        <th className='text-center'>Action</th>
                    </tr>
                    </thead>
                    {!loading && <tbody>
                    {todoLists.map(todolist => <tr key={todolist.id}>
                        <td><Link className="text-decoration-none" to={"/tache/" + todolist.id}>{todolist.id}</Link>
                        </td>
                        <td>{todolist.titre}</td>
                        <td className='text-center'>
                            <div>
                                <span
                                    className={"px-2 badge badge-success bg-" + STATUS_CLASSES[todolist.status]}>{STATUS_LABELS[todolist.status]}</span>
                            </div>
                        </td>
                        <td>
                            <Link
                                to={"/tache/" + todolist.id}
                                className="btn btn-sm btn-primary mr-2">Voir</Link>
                            <Link
                                to={"/edit/" + todolist.id}
                                className="btn btn-sm btn-primary mr-2">Editer</Link>

                            <button onClick={() => handleEndTask(todolist.id, todolist)}
                                    className="btn btn-sm btn-success">Terminer la tache
                            </button>
                            <button onClick={() => handleDelete(todolist.id)}
                                    className="btn btn-sm btn-danger">Supprimer
                            </button>
                        </td>
                    </tr>)}

                    </tbody>}
                </table>
                {loading && <TableLoader/>}
            </div>
        </>
    );
}

export default TachesPage;