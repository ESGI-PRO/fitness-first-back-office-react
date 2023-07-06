import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAll() {
    return http.get("/users", { headers });
}

function get(id: string) {
    return http.get(`/users/${id}`, { headers });
}

function create(data: any) {
    return http.post("/users/register", data);
}

function update(id: string, data: any) {
    return http.put(`/users/${id}`, data, { headers });
}

function remove(id: string) {
    return http.delete(`/users/${id}`, { headers });
}

export const usersService = {
    getAll,
    get,
    create,
    update,
    remove,
}