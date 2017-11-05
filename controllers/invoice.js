const Service = require('../models/Service');
const User = require('../models/User');
const Invoice = require('../models/Invoice');

/**
 * GET /services/:service
 * List all invoices for a service.
 */
exports.getInvoices = (req, res) => {
  Service.findById(req.params.service, (errors, service) => {
    const { invoices } = service;

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/services');
    }

    if (!invoices.length) {
      // req.flash('errors', errors); // todo: add the error
      return res.redirect('/services');
    }

    console.log(invoices);
  });
};
