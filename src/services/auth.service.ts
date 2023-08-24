import http from "../common/http-common";

const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

function login(email: string, password: string) {
    return http.post("/users/login", {
        email,
        password
    });
}

function logout() {
    return http.post("/users/logout", {}, { headers });
}

function getCurentUser() {
    return http.get("/users/me", { headers });
}

export const authService = {
    login,
    logout,
    getCurentUser
}