// membuat connection dengan menggunakan knex
const knex = require("knex")({
  // database yang digunakan
  client: process.env.DB_CLIENT,

  // informasi yang digunakan
  connection: {
    host: process.env.DB_HOST, // hostname
    port: process.env.DB_PORT, // post mysql
    user: process.env.DB_USER, // user yang digunakan
    password: process.env.DB_PASS, // passsword yang digunakan
    database: process.env.DB_DATABASE, // nama database yang digunakan
  },
});

export default knex; // mengexport defaultuvariable
