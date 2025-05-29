class UserStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUsers({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  findUserbyNameOrEmail(query) {
    const users = Object.values(this.storage);
    console.log("users", users);
    return users.filter((user) => {
      return (
        user.firstName.includes(query) ||
        user.lastName.includes(query) ||
        user.email.includes(query)
      );
    });
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

module.exports = new UserStorage();
