import http from '../common/http-common';

function getAll() {
    return http.get("/users");
}

function get(id: number) {
    return http.get(`/users/${id}`);
}

function create(data: any) {
    return http.post("/users", data);
}

function update(id: number, data: any) {
    return http.put(`/users/${id}`, data);
}

function remove(id: number) {
    return http.delete(`/users/${id}`);
}

export const usersService = {
    getAll,
    get,
    create,
    update,
    remove,
}