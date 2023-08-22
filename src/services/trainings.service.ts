import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAll() {
    return http.get("/training/exercises", { headers });
}

function create(data: any) {
    return http.post("/training/exercises", data, { headers });
}

function update(id: string, data: any) {
    return http.put(`/training/exercises/${id}`, data, { headers });
}

function getById(id: string) {
    return http.get(`/training/exercises/${id}`, { headers });
}

function remove(id: string) {
    return http.delete(`/training/exercises/${id}`, { headers });
}

export const trainingsService = {
    getAll,
    create,
    update,
    getById,
    remove
}