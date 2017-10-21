/**
 * GET /services
 * List all services.
 */
const ObjectId = require('mongoose').Types.ObjectId;
const slug = require('slug');

const Service = require('../models/Service.js');
const User = require('../models/User.js');

exports.getServices = (req, res) => {
  Service.find({ $or: [{ owner: req.user.id }, { owner: 'default' }] }, (err, services) => {
    res.render('services/list', { services, caca: 'devaca' });
  });
  // .allByUser(req.user.id)
  // .exec((err, services) => {
  //   res.render('services/list', { services });
  // });
};

exports.createServices = (req, res, next) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/services');
  }

  const service = new Service({
    name: req.body.name,
    url: req.body.url,
    owner: ObjectId(req.user.id),
    user: req.body.user,
    password: req.body.password,
  });

  service.save(err => {
    if (err) {
      return next(err);
    }

    req.flash('success', { msg: 'Service has been added.' });
    res.redirect('/services');
  });

  // Service.findOne({ slug: slug(req.body.name) }, (err, existingService) => {
  //   if (err) {
  //     return next(err);
  //   }

  //   if (existingService) {
  //     req.flash('errors', { msg: 'The service name you have entered has already been added.' });
  //     return res.redirect('/services');
  //   }

  //   service.save(err => {
  //     if (err) {
  //       return next(err);
  //     }

  //     req.flash('success', { msg: 'Service has been added.' });
  //     res.redirect('/services');
  //   });
  // });
};

exports.updateServices = (req, res, next) => {};

exports.deleteServices = (req, res, next) => {};
