import http from "../common/http-common";

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function get() {
    return http.get("/nutrition/ingredients", { headers });
}

function getAllCategories() {
    return http.get("/nutrition/categories", { headers });
}

function create(data: any) {
    return http.post("/nutrition/ingredients", data, { headers });
}

function remove(id: string) {
    return http.delete(`/nutrition/ingredients/${id}`, { headers });
}

function update(id: string, data: any) {
    return http.put(`/nutrition/ingredients/${id}`, data, { headers });
}

function getById(id: string) {
    return http.get(`/nutrition/ingredients/${id}`, { headers });
}

export const ingredientsService = {
    get,
    create,
    remove,
    update,
    getById,
    getAllCategories
}