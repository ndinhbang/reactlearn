import http from "@/utils/http.js";

// eslint-disable-next-line no-unused-vars
const login = async (credentials) => {
    return await http.post(`auth/login`, {...credentials} || {});
}

const logout = async () => {
    return await http.delete(`auth/logout`);
}

const getUserInfo = async () => {
    return await http.get(`auth/user`);
}

export {
    login,
    logout,
    getUserInfo,
};


