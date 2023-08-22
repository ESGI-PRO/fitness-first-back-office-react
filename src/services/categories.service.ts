import http from "../common/http-common";

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function get() {
    return http.get("/nutrition/categories", { headers });
}

function create(data: any) {
    return http.post("/nutrition/categories", data, { headers });
}

function remove(id: string) {
    return http.delete(`/nutrition/categories/${id}`, { headers });
}

function update(id: string, data: any) {
    return http.put(`/nutrition/categories/${id}`, data, { headers });
}

function getById(id: string) {
    return http.get(`/nutrition/categories/${id}`, { headers });
}

export const categoriesService = {
    get,
    create,
    remove,
    update,
    getById
}