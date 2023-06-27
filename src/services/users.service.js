import http from '../common/http-common';

function getAll() {
    return http.get('/users/all');
}

function get(id) {
    return http.get(`/users/${id}`);
}

function create(data) {
    return http.post('/users', data);
}

function update(id, data) {
    return http.put(`/users/${id}`, data);
}

function remove(id) {
    return http.delete(`/users/${id}`);
}

export const usersService = {
    getAll,
    get,
    create,
    update,
    remove,
};