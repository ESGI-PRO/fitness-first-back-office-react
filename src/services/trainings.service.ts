import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAll() {
    return http.get("/training/exercises", { headers });
}

export const trainingsService = {
    getAll,
}