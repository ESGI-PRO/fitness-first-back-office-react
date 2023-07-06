import http from '../common/http-common';

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function getAllSubscriptions() {
    return http.get("/subscription/find-all-subscriptions", { headers });
}

function getAllInvoices() {
    return http.get("/subscription/find-all-invoices", { headers });
}

function getAllPlans() {
    return http.get("/subscription/find-all-plans", { headers });
}

export const subscriptionsService = {
    getAllSubscriptions,
    getAllInvoices,
    getAllPlans
}