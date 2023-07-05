import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAll() {
    return http.get("/subscription/find-all-subscriptions", { headers });
}

export const subscriptionsService = {
    getAll,
}