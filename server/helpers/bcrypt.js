const bcrypt = require("bcryptjs")
const hashPassword = (value) => bcrypt.hashSync(value, 8);
const comparePassword = (password, hashed) => bcrypt.compareSync(password, hashed);

module.exports = { hashPassword, comparePassword };