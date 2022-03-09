# This project was built in just one night after reviewing and rehashing NodeJS, Express, and MySQL.

The intent is to demonstrate different styles of coding, skill level, and comprehension.

## Description of backend:

The backend utilize a popular Express framework for NodeJS where I utilize it's routing and middleware capabilities (this is also reflected in my previous project). What's different and new is connecting to MySQL database using Sequelize ORM to create Restful CRUD API.

I also included JWT token-based authentication/authorization. It begins with login and check token for authentication to protect against "high-risk" action such as creating a record, updating a record, and deleting a record.

## What more can I do with this project had I more time?:

I would stress test the app to ensure security is sound such as SQL injection, XSS scripting, verbose message or information leak. There are plenty of library available to create a more secure token transaction and further reinforce the Restful APIs.

## Running the server locally:

1. [Install MySQL](https://dev.mysql.com/doc/refman/5.7/en/installing.html 'Official MySQL Installation Manuel')
2. Download the repo
3. Make sure to check the configuration to the db.config.js file
4. Type `npm start`

Viola! The server will start running, creating an initial user_roles which is the "admin" role.
SwaggerUI is utilized with this backend and can be found at `localhost:8080/api-docs`
