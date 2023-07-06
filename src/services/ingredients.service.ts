import http from "../common/http-common";

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAll() {
    return http.get("/nutrition/ingredients", { headers });
}

function getAllCategories() {
    return http.get("/nutrition/categories", { headers });
}

function create(data: any) {
    return http.post("/nutrition/ingredients", data, { headers });
}

function deleteById(id: number) {
    return http.delete(`/nutrition/ingredients/${id}`, { headers });
}

function updateById(id: number, data: any) {
    return http.put(`/nutrition/ingredients/${id}`, data, { headers });
}

export const ingredientsService = {
    getAll,
    getAllCategories,
    create,
    deleteById,
    updateById
}