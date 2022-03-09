module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'Tmm@494961263',
  DB: 'housingDB',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
