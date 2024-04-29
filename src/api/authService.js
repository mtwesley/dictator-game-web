import api from ".";

export default {
  login(username, password) {
    return api.post(`/login`, { username, password });
  },

  register(name, username, password) {
    return api.post(`/register`, { name, username, password });
  },

  registerCheck(username) {
    return api.get(`/register/check/${username}`);
  },

  refresh(token) {
    return api.post(`/refresh`, { token });
  },

  profile() {
    return api.get('/profile');
  }
};
