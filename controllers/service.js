/**
 * GET /services
 * List all services.
 */
const Service = require('../models/Service');
const User = require('../models/User');
const decrypt = require('../lib/encription').decrypt;

exports.getActiveServices = (req, res) => {
  Service.find()
    .allPrivateByUser(req.user.id)
    .exec((err, services) => {
      res.render('services/list', { title: 'Services', services });
    });
};

exports.getServicesAvailable = (req, res) => {
  Service.find()
    .allDefault()
    .exec((err, services) => {
      res.render('services/add', { title: 'Add Service', services });
    });
};

exports.addService = (req, res, next) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/services');
  }

  Service.findById(req.body.selectedServiceId, (err, serviceTemplate) => {
    if (err) {
      return next(err);
    }

    const service = new Service({
      name: serviceTemplate.name,
      url: req.body.url,
      logo: serviceTemplate.logo,
      category: serviceTemplate.category,
      owner: req.user.id,
      user: req.body.user,
      password: req.body.password,
    });

    service.save((err) => {
      if (err) {
        return next(err);
      }

      User.findById(req.user.id, (err, user) => {
        if (err) {
          return next(err);
        }

        user.services.push(service);
        user.save((err) => {
          if (err) {
            return next(err);
          }
        });
      });

      req.flash('success', { msg: 'Service has been added.' });
      res.redirect('/services');
    });
  });
};

exports.updateServices = (req, res, next) => {};

exports.deleteServices = (req, res, next) => {};
