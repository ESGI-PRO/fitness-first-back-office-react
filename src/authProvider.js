const authProvider = {
    login: async ({ username, password }) => {
        const response = await fetch('http://localhost:8000/users/login', {
            method: 'POST',
            body: JSON.stringify({ 
                email: username,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.status < 200 || response.status >= 300) {
            return Promise.reject();
        }

        localStorage.setItem('token', data.data.token.access.token);
        
        return Promise.resolve();
    },

    checkError: async (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: async () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    logout: async () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    getIdentity: () => Promise.resolve(),

    getPermissions: () => Promise.resolve(),
};

export default authProvider;
