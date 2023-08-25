import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAll() {
    return http.get("/users", { headers });
}

function getById(id: string) {
    return http.get(`/users/${id}`, { headers });
}

function create(data: any) {
    return http.post("/users/new_user", data);
}

function update(id: string, data: any) {
    return http.put(`/users/${id}`, data, { headers });
}

function remove(id: string) {
    return http.delete(`/users/${id}`, { headers });
}

function getRoleRequest() {
    return http.get("/users/role/change_requests", { headers });
}

function changeRole(id: string) {
    return http.post(`/users/role/change_requests/${id}`, {}, { headers });
}

function changeApproval(id: string) {
    return http.post(`/users/role/change_approval/${id}`, {}, { headers });
}

export const usersService = {
    getAll,
    getById,
    create,
    update,
    remove,
    getRoleRequest,
    changeRole,
    changeApproval
}