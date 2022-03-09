const db = require('../models');
const Housing = db.housing;
const OP = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }

  //housing object
  const currDate = new Date();
  const house = {
    title: req.body.title,
    price: req.body.price,
    numBedroom: req.body.numBedroom,
    numBathroom: req.body.numBathroom,
    squarefoot: req.body.squarefoot,
    address: req.body.address,
    images: req.body.images,
    datePosted: currDate.toLocaleDateString(),
    sold: req.body.sold ? req.body.sold : false,
  };

  //create a house listing
  Housing.create(house)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || 'Some error occured while creating a new house listing.' })
    );
};

//query all house listing
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [OP.like]: `%${title}%` } } : null;

  Housing.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || 'Some error occured while retrieving the full house listing.' })
    );
};

//query all sold house listing
exports.findAllSold = (req, res) => {
  Housing.findAll({ where: { sold: true } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || 'Some error occured while retrieving sold house listing.' })
    );
};

//query all not sold house listing
exports.findAllNotSold = (req, res) => {
  Housing.findAll({ where: { sold: false } })
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || 'Some error occured while retrieving not sold house listing.' })
    );
};

//query a single house listing
exports.findOne = (req, res) => {
  const id = req.params.id;
  Housing.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find housing with id: ${id}.` });
      }
    })
    .catch((err) => res.status(500).send({ message: `Error retrieving housing info with id: ${id}.` }));
};

//update a single house listing
exports.update = (req, res) => {
  const id = req.params.id;
  Housing.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: 'This housing was successfully updated.' });
      } else {
        res.send({ message: `Unable to update housing info with id: ${id}.` });
      }
    })
    .catch((err) => res.status(500).send({ message: `Error updating housing info with id: ${id}.` }));
};

//delete a single house listing
exports.delete = (req, res) => {
  const id = req.params.id;
  Housing.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: 'This housing info was deleted successfully.' });
      } else {
        res.send({ message: `Unable to delete housing info with id: ${id}.` });
      }
    })
    .catch((err) => res.status(500).send({ message: `Unable to delete housing info with id: ${id}.` }));
};
