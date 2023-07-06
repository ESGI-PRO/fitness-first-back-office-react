import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAll() {
    return http.get("/nutrition", { headers });
}

function getIngredients() {
    return http.get("/nutrition/ingredients", { headers });
}

export const nutritionsService = {
    getAll,
    getIngredients
}