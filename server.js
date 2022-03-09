const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/api/v1/models');
const Role = db.role;

db.sequelize
  .sync()
  .then(() => {
    //console.log('Drop n re-sync MySQL DB');
    initiate();
  })
  .catch((err) => console.error(err));

const initiate = () => {
  Role.create({
    id: 1,
    name: 'admin',
  });
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Tmood's Housing API",
      version: 'v1.0.0',
      description: 'CRUD demo with React, NodeJS, Express and MySQL',
      contact: {
        name: 'Tamer Mahmoud',
        url: 'https://www.github.com/TmoodGitHub',
        email: 'tamer.m.mahmoud@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./app/api/v1/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
//console.log(swaggerDocs);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Tmood's Housing Mortgage!",
  });
});

require('./app/api/v1/routes/auth.routes')(app);
require('./app/api/v1/routes/housing.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
