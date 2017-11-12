const User = require('../models/User');
const Service = require('../models/Service');
const Invoice = require('../models/Invoice');

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
    select: '_id email services profile', // we're not populating services, only a list of ids
    sort: 'createdAt'
  })
    .then(({ docs, ...rest }) => {
      res.render('admin/users', { users: docs, ...rest });
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * POST user
 */
exports.postUsers = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  // req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/admin/users');
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name,
    },
  });

  if (req.body.admin === true) {
    user.admin = true;
  }

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.redirect('/admin/users');
    }

    user.save((err) => {
      if (err) { return next(err); }

      // req.flash('errors', { msg: 'Success!' });
      res.redirect('/admin/users');
    });
  });
};

/**
 * GET user details
 */
exports.getUser = (req, res, next) => {
  // res.redirect('/admin/users');
  User.findById(req.params.user).populate('services').exec((error, user) => {
    if (error) {
      console.log(error);
      return res.redirect('/admin/users');
    }

    Service.find({ owner: undefined }, ['_id', 'name', 'url', 'logo', 'category'], { sort: { category: 'asc', name: 'asc' } })
      .exec((error, services) => {
        if (error) { return next(error); }

        res.render('admin/user', { user, services });
      });
  });
};

/**
 * POST user profile
 */
exports.postUserProfile = (req, res, next) => {
  User.findById(req.params.user, (findError, user) => {
    if (findError) { return next(findError); }

    user.email = req.body.email;
    user.profile.name = req.body.name;
    user.save((saveError) => {
      if (saveError) { return next(saveError); }

      res.redirect(`/admin/users/${req.params.user}`);
    });
  });
};

/**
 * POST user password
 */
exports.postUserPassword = (req, res, next) => {
  User.findById(req.params.user, (findError, user) => {
    if (findError) { return next(findError); }

    user.password = req.body.password;
    user.save((saveError) => {
      if (saveError) { return next(saveError); }

      res.redirect(`/admin/users/${req.params.user}`);
    });
  });
};

/**
 * POST user admin
 */
exports.postUserAdmin = (req, res, next) => {
  User.findById(req.params.user, (findError, user) => {
    if (findError) { return next(findError); }

    user.admin = req.body.admin === 'true';
    user.save((saveError) => {
      if (saveError) { return next(saveError); }

      res.redirect(`/admin/users/${req.params.user}`);
    });
  });
};

/**
 * GET user service
 */
exports.getUserService = (req, res, next) => {
  Service.findById(req.params.service)
    .populate('invoices')
    .exec((error, service) => {
      if (error) { return res.redirect(`/admin/users/${req.params.user}`); }

      User.findById(req.params.user, (findError, user) => {
        res.render('admin/userService', { service, user });
      });
    });
};

/**
 * POST user service
 */
exports.postUserService = (req, res, next) => {
  Service.findById(req.params.service, (findError, service) => {
    if (findError) { return next(findError); }

    service.user = req.body.user;
    service.password = req.body.password;
    service.save((saveError) => {
      if (saveError) { return next(saveError); }

      res.redirect(`/admin/users/${req.params.user}/services/${req.params.service}`);
    });
  });
};

/**
 * POST add new service
 */
exports.addUserService = (req, res, next) => {
  Service.findById(req.body.service, (err, serviceTemplate) => {
    if (err) { return next(err); }

    const service = new Service({
      name: serviceTemplate.name,
      url: serviceTemplate.url,
      logo: serviceTemplate.logo,
      category: serviceTemplate.category,
      owner: req.body.userid,
      user: req.body.username,
      password: req.body.password,
      active: true,
    });

    service.save((err) => {
      if (err) { return next(err); }

      User.findById(req.body.userid, (err, user) => {
        if (err) { return next(err); }

        user.services.push(service);
        user.save((err) => {
          if (err) { return next(err); }

          res.redirect(`/admin/users/${req.body.userid}`);
        });
      });

    });
  });
}

/**
 * GET default services
 */
exports.getDefaultServices = (req, res, next) => {
  Service.find({ owner: undefined }, ['_id', 'name', 'url', 'logo', 'category'], { sort: { category: 'asc', name: 'asc' } })
    .exec((error, services) => {
      if (error) { return next(error); }

      res.render('admin/services', { services });
    });
};

/**
 * POST default service
 */
exports.postDefaultService = (req, res, next) => {
  const service = new Service({
    name: req.body.name,
    url: req.body.url,
    logo: req.body.logo,
    category: req.body.category
  });

  service.save((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/admin/services');
  });
};

/**
 * GET service detail
 */
exports.getService = (req, res, next) => {
  Service.findById(req.params.service, (error, service) => {
    if (error) { return next(error); }

    res.render('admin/service', { service });
  });
};

/**
 * POST service detail
 */
exports.postService = (req, res, next) => {
  Service.findById(req.params.service, (error, service) => {
    if (error) { return next(error); }

    service.name = req.body.name;
    service.url = req.body.url;
    service.logo = req.body.logo;
    service.category = req.body.category;

    service.save((err) => {
      if (err) { return next(err); }

      res.redirect(`/admin/services/${req.params.service}`);
    });
  });
};

exports.postUserInvoice = (req, res, next) => {
  Service.findById(req.params.service, (error, service) => {
    if (error) { return next(error); }

    if (!req.file) {
      res.status(500).send('File type not valid');
    }

    const invoice = new Invoice({
      owner: req.params.user,
      service: req.params.service,
      date: new Date(req.body.date), // use momentjs
      amount: req.body.amount,
      currency: req.body.currency,
      file: req.file,
    });

    User.findById(req.params.user, (error, user) => {
      if (error) { return next(error); }

      invoice.save((err) => {
        if (err) { return next(err); }

        service.invoices.push(invoice);
        user.invoices.push(invoice);

        service.save((err) => {
          if (err) { return next(err); }

          res.redirect(`/admin/users/${req.params.user}/services/${req.params.service}`);
        });
      });
    });
  });
};
