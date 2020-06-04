require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
