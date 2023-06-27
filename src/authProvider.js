const authProvider = {
    login: async ({ username, password }) => {
        const request = await fetch('http://localhost:8000/users/login', {
            method: 'POST',
            body: JSON.stringify({ 
                email: username,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await request.json()

        if (response.status < 200 || response.status >= 300) {
            return Promise.reject();
        }

        if (response.data.user.role !== 'ADMIN') {
            return Promise.reject();
        }

        console.log('TOKEN', response);
        localStorage.setItem('token', response.data.token);
        
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
