const { authJwt } = require('../middleware');
const housing = require('../controllers/housing.controller');
const router = require('express').Router();

module.exports = (app) => {
  //set up token header
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  /**
   * @swagger
   * definitions:
   *  housing:
   *    type: object
   *    properties:
   *      title:
   *        type: string
   *        description: title of the home
   *        example: 'A beautiful ranch for sale!'
   *      price:
   *        type: integer
   *        description: pricing of a home
   *        example: '400000'
   *      numBedroom:
   *        type: integer
   *        description: number of bedroom
   *        example: '4'
   *      numBathroom:
   *        type: integer
   *        description: number of bathroom
   *        example: '2.5'
   *      squarefoot:
   *        type: integer
   *        description: square foot of a home
   *        example: '1500'
   *      address:
   *        type: string
   *        description: full address of a home
   *        example: '123 Overthere Dr, Somewhere, VA 55555'
   *      images:
   *        type: string
   *        description: link to images gallary
   *        example: 'none-at-the-moment'
   *      sold:
   *        type: boolean
   *        description: indicate whether a house is sold
   *        example: 'false'
   */

  /**
   * @swagger
   * /api/housing/:
   *  post:
   *    summary: create a housing info
   *    description: create new house listing for sale
   *    parameters:
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *        description: access token required to update
   *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2ODE3NTc3LCJleHAiOjE2NDY5MDM5Nzd9._OeInA-ACZj46q0192uvpfBfZl0eqjvAfhMr_9-vJ64
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#definitions/housing'
   *    responses:
   *      200:
   *        description: new housing info created
   *      500:
   *        description: error occured while creating new house listing
   *
   */
  router.post('/', [authJwt.verifyToken, authJwt.isAdmin], housing.create);

  /**
   * @swagger
   * /api/housing/:
   *  get:
   *    summary: gather list of all house
   *    description: retrieve full housing list
   *    responses:
   *      200:
   *        description: full housing list available
   *      500:
   *        description: error occured while colleting full housing list
   *
   */
  router.get('/', housing.findAll);

  /**
   * @swagger
   * /api/housing/sold:
   *  get:
   *    summary: gather list of all house that are sold
   *    description: retrieve full sold housing list
   *    responses:
   *      200:
   *        description: full osld housing list available
   *      500:
   *        description: error occured while colleting full sold housing list
   *
   */
  router.get('/sold', housing.findAllSold);

  /**
   * @swagger
   * /api/housing/notsold:
   *  get:
   *    summary: gather list of all housing not sold
   *    description: retrieve full not sold housing list
   *    responses:
   *      200:
   *        description: full not sold housing list available
   *      500:
   *        description: error occured while colleting full not sold housing list
   *
   */
  router.get('/notsold', housing.findAllNotSold);

  /**
   * @swagger
   * /api/housing/{id}:
   *  get:
   *    summary: gather info of a single house
   *    description: retrieve single housing info
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: id of the housing info
   *        example: 2
   *    responses:
   *      200:
   *        description: single housing info found
   *      500:
   *        description: error occured while finding single housing info
   *
   */
  router.get('/:id', housing.findOne);

  /**
   * @swagger
   * /api/housing/{id}:
   *  put:
   *    summary: update info of a single house
   *    description: update single housing info
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: id of the housing info
   *        example: 2
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *        description: access token required to update
   *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2ODE3NTc3LCJleHAiOjE2NDY5MDM5Nzd9._OeInA-ACZj46q0192uvpfBfZl0eqjvAfhMr_9-vJ64
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/definitions/housing'
   *    responses:
   *      200:
   *        description: single housing info updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/definitions/housing'
   *      500:
   *        description: error occured while finding single housing info
   *
   */
  router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], housing.update);

  /**
   * @swagger
   * /api/housing/{id}:
   *  delete:
   *    summary: delete a single house info
   *    description: remove single housing info
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: id of the housing info
   *        example: 2
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *        description: access token required to delete
   *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2ODE3NTc3LCJleHAiOjE2NDY5MDM5Nzd9._OeInA-ACZj46q0192uvpfBfZl0eqjvAfhMr_9-vJ64
   *    responses:
   *      200:
   *        description: single housing info deleted
   *      500:
   *        description: error occured while finding single housing info
   *
   */
  router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], housing.delete);

  app.use('/api/housing', router);
};
