import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function get() {
    return http.get("/nutrition", { headers });
}

function getById(id: string) {
    return http.get(`/nutrition/${id}`, { headers });
}

function update(id: string, data: any) {
    return http.put(`/nutrition/${id}`, data, { headers });
}

function remove(id: string) {
    return http.delete(`/nutrition/${id}`, { headers });
}

function create(data: any) {
    return http.post("/nutrition", data, { headers });
}

export const nutritionsService = {
    get,
    create,
    remove,
    update,
    getById
}