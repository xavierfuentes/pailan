const Service = require('../models/Service');
const User = require('../models/User');
const Invoice = require('../models/Invoice');

/**
 * GET /services/:service
 * List all invoices for a service.
 */
exports.getInvoices = (req, res) => {
  const query = { service: req.params.service };

  Invoice.paginate(query, {
    page: req.query.hasOwnProperty('page') ? +req.query.page : 1,
    limit: req.query.hasOwnProperty('limit') ? +req.query.limit : 20,
    // select: 'email services profile',
    // populate: 'service',
    sort: 'date'
  })
    .then(({ docs, ...rest }) => {
      Service.findById(req.params.service, (err, service) => {
        res.render('invoices/list', { title: 'Add Service', invoices: docs, service, ...rest });
      })
    })
    .catch((error) => {
      console.log(error);
    });
};
