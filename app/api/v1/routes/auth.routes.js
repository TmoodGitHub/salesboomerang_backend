const { verifySignUp, authJwt } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
  //set up token header
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  /**
   * @swagger
   * definitions:
   *  register:
   *    type: object
   *    properties:
   *      firstname:
   *        type: string
   *        description: first name of user
   *        example: 'Tamer'
   *      lastname:
   *        type: string
   *        description: last name of user
   *        example: 'Mahmoud'
   *      email:
   *        type: string
   *        description: user's email address
   *        example: 'tamer.m.mahmoud@gmail.com'
   *      username:
   *        type: string
   *        description: username for registration
   *        example: 'Tmood'
   *      password:
   *        type: string
   *        description: password for authentication
   *        example: '123456'
   *  signin:
   *    type: object
   *    properties:
   *      username:
   *        type: string
   *        description: username for authentication
   *        example: 'tmood'
   *      password:
   *        type: string
   *        description: password for authentication
   *        example: '123456'
   */

  /**
   * @swagger
   * /api/auth/register:
   *  post:
   *    summary: create a new user
   *    description: create user for web app
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#definitions/register'
   *    responses:
   *      200:
   *        description: user registered successfully
   *      400:
   *        description: username/email already taken || role does not exist in DB
   *      500:
   *        description: unable to register user
   *
   */
  app.post(
    '/api/auth/register',
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
    controller.register
  );

  /**
   * @swagger
   * /api/auth/signin:
   *  post:
   *    summary: login the web app
   *    description: Accessing the web app - note, upon successful login, you'll be given an access token that will be your enable you to have access to certain page or give permission to perform certain actions such as create, edit or delete house listing.
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#definitions/signin'
   *    responses:
   *      200:
   *        description: user logged in successfully
   *      400:
   *        description: username/password cannot be empty
   *      401:
   *        description: invalid username/password
   *      404:
   *        description: user not found
   *      500:
   *        description: server fault
   *
   */
  app.post('/api/auth/signin', controller.signin);

  /**
   * @swagger
   * /api/auth/profile:
   *  get:
   *    summary: view user's profile
   *    description: Take a peak at user's profile
   *    parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *        description: access token required to view profile page
   *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2ODE3NTc3LCJleHAiOjE2NDY5MDM5Nzd9._OeInA-ACZj46q0192uvpfBfZl0eqjvAfhMr_9-vJ64
   *    responses:
   *      200:
   *        description: Success
   *      401:
   *        description: Unauthorized access
   *      403:
   *        description: No token provided || require admin privilege
   *      500:
   *        description: Cannot find user/does not have authorized access
   *
   */
  app.get('/api/auth/profile', [authJwt.verifyToken, authJwt.isAdmin], controller.adminPage);
};
