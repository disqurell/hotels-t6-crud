let id = 0;

let db = {
  users: {},

  createUser(email, password) {
    id++;
    this[id] = {
      email,
      password,
    };
    return id;
  },
  getUser(id) {
    return this[id];
  },
  getUserByEmail(email) {
    for (let id in this) {
      if (this[id].email === email) {
        return this[id];
      }
    }
  },
  updateUser(id, data) {
    this[id] = data;
    return this[id];
  },
  deleteUser(id) {
    this[id] = null;
  },
};

module.exports = { db };
