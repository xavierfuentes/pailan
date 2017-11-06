const User = require('../models/User');
const Service = require('../models/Service');
// const decrypt = require('../lib/encription').decrypt;

/**
 * GET admin home
 */
exports.index = (req, res) => {
  res.render('admin/dashboard');
};

/**
 * GET users list
 */
exports.getUsers = (req, res) => {
  const query = {};
  // User.find(query)
  User.paginate(query, {
    page: req.query.hasOwnProperty('page') ? +req.query.page : 1,
    limit: req.query.hasOwnProperty('limit') ? +req.query.limit : 20,
    select: '_id email services', // we're not populating services, only a list of ids
    sort: 'email'
  })
    .then(({ docs, ...rest }) => {
      res.render('admin/users', { users: docs, ...rest });
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * GET user details
 */
exports.getUser = (req, res) => {
  // res.redirect('/admin/users');
  User.findById(req.params.user).populate('services').exec((error, user) => {
    if (error) {
      console.log(error);
      return res.redirect('/admin/users');
    }

    res.render('admin/user', { user });
  });

  // populate the services
};