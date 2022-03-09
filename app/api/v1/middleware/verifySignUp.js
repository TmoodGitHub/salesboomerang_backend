const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: 'This username is already in use.' });
        return;
      }

      User.findOne({
        where: {
          email: req.body.username,
        },
      })
        .then((email) => {
          if (email) {
            res.status(400).send({ message: 'This email is already in use.' });
            return;
          }

          next();
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({ message: `Error, the role: ${req.body.roles[i]} does not exist.` });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
