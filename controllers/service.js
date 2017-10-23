/**
 * GET /services
 * List all services.
 */
const ObjectId = require('mongoose').Types.ObjectId;
const slug = require('slug');

const Service = require('../models/Service');
const User = require('../models/User');

exports.getActiveServices = (req, res) => {
  Service.find()
    .allPrivateByUser(req.user.id)
    .exec((err, services) => {
      res.render('services/list', { services });
    });
};

exports.getServicesAvailable = (req, res) => {
  Service.find()
    .allDefault()
    .exec((err, services) => {
      res.render('services/add', { services });
    });
};

exports.addService = (req, res, next) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/services');
  }

  /**
   * todo:
   *  1. find the default service to clone
   *  2. fill the gaps with the user data
   *  3. save it
   *  4. add it to the list of active services of the user
   */

  // Service.find()
  //   .allDefault()
  //   .exec((err, services) => {
  //     res.render('services/add', { services });
  //   });

  // const service = new Service({
  //   name: req.body.name,
  //   url: req.body.url,
  //   owner: req.user.id,
  //   user: req.body.user,
  //   password: req.body.password,
  // });

  // service.save((err) => {
  //   if (err) {
  //     return next(err);
  //   }

  //   User.findById(req.user.id, (err, user) => {
  //     if (err) {
  //       return next(err);
  //     }

  //     user.services.push(service);
  //     user.save((err) => {
  //       if (err) {
  //         return next(err);
  //       }
  //     });
  //   });

  //   req.flash('success', { msg: 'Service has been added.' });
  //   res.redirect('/services');
  // });

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
