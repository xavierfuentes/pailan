/**
 * GET /services
 * List all services.
 */
const Service = require('../models/Service.js');

exports.getServices = (req, res) => {
  Service.find((err, docs) => {
    res.render('services/list', { services: docs });
  });
};

exports.createServices = (req, res, next) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/services');
  }

  const service = new Service({
    name: req.body.name,
    user: req.body.user,
    password: req.body.password,
  });

  // todo: check if it's already there using something better than 'name'

  Service.findOne({ name: req.body.name }, (err, existingService) => {
    if (err) {
      return next(err);
    }
    if (existingService) {
      req.flash('errors', { msg: 'Service with that name already exists.' });
      return res.redirect('/services');
    }
    service.save(err => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Service has been added.' });
      res.redirect('/services');
    });
  });
};

exports.updateServices = (req, res, next) => {};

exports.deleteServices = (req, res, next) => {};
