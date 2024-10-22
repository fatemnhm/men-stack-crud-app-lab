const Sneaker = require('../models/sneaker');

const index = async (req, res) => {
  const allSneakers = await Sneaker.find({});
  res.render('sneakers/index.ejs', { sneakers: allSneakers });
};

const newSneaker = (req, res) => {
  res.render('sneakers/new.ejs');
};

const create = async (req, res) => {
  const formData = req.body;
  formData.isAvailable = req.body.isAvailable === 'on';
  await Sneaker.create(formData);
  res.redirect('/sneakers');
};

const show = async (req, res) => {
  const foundSneaker = await Sneaker.findById(req.params.sneakerId);
  res.render('sneakers/show.ejs', { sneaker: foundSneaker });
};

const deleteSneaker = async (req, res) => {
  await Sneaker.findByIdAndDelete(req.params.sneakerId);
  res.redirect('/sneakers');
};

const edit = async (req, res) => {
  const foundSneaker = await Sneaker.findById(req.params.sneakerId);
  res.render('sneakers/edit.ejs', { sneaker: foundSneaker });
};

const update = async (req, res) => {
  const formData = req.body;
  formData.isAvailable = req.body.isAvailable === 'on';
  await Sneaker.findByIdAndUpdate(req.params.sneakerId, formData);
  res.redirect(`/sneakers/${req.params.sneakerId}`);
};

module.exports = {
  index,
  new: newSneaker,
  create,
  show,
  delete: deleteSneaker,
  edit,
  update,
};
