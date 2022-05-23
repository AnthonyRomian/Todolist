import axios from 'axios';
import {TACHES_API} from '../config';

function findAll() {
    return axios
        .get(TACHES_API)
        .then(response => response.data["hydra:member"]);
}

function deleteMassage(id) {
    return axios
        .delete(TACHES_API + "/" + id);
}

function find(id) {
    return axios.get(TACHES_API + "/" + id)
        .then(response => response.data);
}

function update(id, tache) {
    return axios.put(TACHES_API + "/" + id, tache
    );
}

function create(tache) {
    return axios.post(TACHES_API,
        tache
    );
}


export default {
    findAll,
    find,
    update,
    create,
    delete: deleteMassage
};